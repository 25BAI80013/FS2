import { useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWorkspace } from '../context/WorkspaceContext';

const emptyArticle = { title: '', body: '', status: 'draft' };

export default function ContentStudioPage() {
  const { user } = useAuth();
  const { articles, saveArticle, deleteArticle } = useWorkspace();
  const editableArticles = useMemo(() => user.role === 'admin' ? articles : articles.filter((article) => article.authorId === user.id), [articles, user]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyArticle);
  const [notice, setNotice] = useState('');
  const beginEdit = (article) => { setEditing(article.id); setForm({ title: article.title, body: article.body, status: article.status }); setNotice(''); };
  const closeEditor = () => { setEditing(null); setForm(emptyArticle); };
  const submit = (event) => { event.preventDefault(); const result = saveArticle({ ...(editing ? articles.find((item) => item.id === editing) : {}), ...form }); if (result.ok) { setNotice(editing ? 'Article updated successfully.' : 'New article saved successfully.'); closeEditor(); } else setNotice(result.message); };
  const remove = (article) => { const result = deleteArticle(article.id); setNotice(result.ok ? 'Article deleted.' : result.message); if (editing === article.id) closeEditor(); };
  return <><div className="heading"><div><div className="eyebrow">CONTENT OPERATIONS</div><h1>Content studio</h1><p>Create drafts, publish knowledge base articles, and maintain your content.</p></div><button className="primary" onClick={() => { closeEditor(); setEditing('new'); }}>+ New article</button></div>
    {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notice">×</button></div>}
    {editing && <section className="panel editor-panel"><div className="section-heading"><div><div className="eyebrow">{editing === 'new' ? 'NEW ARTICLE' : 'EDIT ARTICLE'}</div><h2>{editing === 'new' ? 'Build something useful' : 'Refine your article'}</h2></div><button className="text-button" onClick={closeEditor}>Cancel</button></div><form className="article-form" onSubmit={submit}><label>Title<input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Give your article a clear title" autoFocus /></label><label>Article body<textarea rows="7" value={form.body} onChange={(event) => setForm({ ...form, body: event.target.value })} placeholder="Write the content your readers need…" /></label><div className="form-footer"><label className="select-label">Visibility<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="draft">Save as draft</option><option value="published">Publish now</option></select></label><button className="primary" type="submit">{form.status === 'published' ? 'Publish article' : 'Save draft'}</button></div></form></section>}
    <section className="article-grid">{editableArticles.map((article) => <article className="article-card" key={article.id}><div className="article-meta"><span className={`status-badge ${article.status}`}>{article.status}</span><time>Updated {new Date(article.updatedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</time></div><h2>{article.title}</h2><p>{article.body}</p><div className="card-actions"><button className="text-button" onClick={() => beginEdit(article)}>Edit</button><button className="danger-button" onClick={() => remove(article)}>Delete</button></div></article>)}</section>
  </>;
}
