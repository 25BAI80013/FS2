import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedArticles, seedAuditEvents, seedUsers } from '../data/seed';
import { useAuth } from './AuthContext';

const WorkspaceContext = createContext(null);
const STORAGE_KEY = 'secure-access-workspace-v2';

function loadWorkspace() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (stored?.users && stored?.articles && stored?.auditEvents) return stored;
  } catch { /* use seeded demo workspace */ }
  return { users: seedUsers, articles: seedArticles, auditEvents: seedAuditEvents };
}

export function WorkspaceProvider({ children }) {
  const { user } = useAuth();
  const [workspace, setWorkspace] = useState(loadWorkspace);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
  }, [workspace]);

  const addAuditEvent = (actor, action) => ({
    id: crypto.randomUUID(), actor, action, occurredAt: new Date().toISOString(),
  });

  const updateUserRole = (userId, role) => {
    if (user?.role !== 'admin') return { ok: false, message: 'Only administrators can update roles.' };
    if (user.id === userId) return { ok: false, message: 'You cannot change your own role in this demo.' };
    const target = workspace.users.find((member) => member.id === userId);
    if (!target) return { ok: false, message: 'User not found.' };
    setWorkspace((current) => ({
      ...current,
      users: current.users.map((member) => member.id === userId ? { ...member, role } : member),
      auditEvents: [addAuditEvent(user.name, `Changed ${target.name}'s role to ${role}`), ...current.auditEvents],
    }));
    return { ok: true };
  };

  const saveArticle = (article) => {
    if (!['admin', 'editor'].includes(user?.role)) return { ok: false, message: 'Your role cannot modify content.' };
    const now = new Date().toISOString();
    const cleanArticle = { ...article, title: article.title.trim(), body: article.body.trim(), updatedAt: now };
    if (!cleanArticle.title || !cleanArticle.body) return { ok: false, message: 'A title and article body are required.' };

    setWorkspace((current) => {
      const isNew = !cleanArticle.id;
      const articleToSave = isNew
        ? { ...cleanArticle, id: crypto.randomUUID(), authorId: user.id, author: user.name }
        : cleanArticle;
      return {
        ...current,
        articles: isNew
          ? [articleToSave, ...current.articles]
          : current.articles.map((item) => item.id === articleToSave.id ? articleToSave : item),
        auditEvents: [addAuditEvent(user.name, `${isNew ? 'Created' : 'Updated'} ${articleToSave.status} article “${articleToSave.title}”`), ...current.auditEvents],
      };
    });
    return { ok: true };
  };

  const deleteArticle = (articleId) => {
    const article = workspace.articles.find((item) => item.id === articleId);
    const canDelete = user?.role === 'admin' || (user?.role === 'editor' && article?.authorId === user.id);
    if (!article || !canDelete) return { ok: false, message: 'You cannot delete this article.' };
    setWorkspace((current) => ({
      ...current,
      articles: current.articles.filter((item) => item.id !== articleId),
      auditEvents: [addAuditEvent(user.name, `Deleted article “${article.title}”`), ...current.auditEvents],
    }));
    return { ok: true };
  };

  const resetDemo = () => {
    if (user?.role !== 'admin') return;
    setWorkspace({ users: seedUsers, articles: seedArticles, auditEvents: seedAuditEvents });
  };

  const value = useMemo(() => ({ ...workspace, updateUserRole, saveArticle, deleteArticle, resetDemo }), [workspace, user]);
  return <WorkspaceContext.Provider value={value}>{children}</WorkspaceContext.Provider>;
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error('useWorkspace must be used inside WorkspaceProvider');
  return context;
}
