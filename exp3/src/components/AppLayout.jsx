import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const roleLabels = { admin: 'Administrator', editor: 'Editor', viewer: 'Viewer' };

export default function AppLayout() {
  const { user, logout } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <NavLink to="/dashboard" className="brand">Secure<span>Access</span></NavLink>
        <p className="role-label">{roleLabels[user.role]} workspace</p>
        <nav>
          <NavLink to="/dashboard"><span>◫</span> Overview</NavLink>
          {user.role === 'admin' && <NavLink to="/admin"><span>♙</span> User management</NavLink>}
          {['admin', 'editor'].includes(user.role) && <NavLink to="/editor"><span>✎</span> Content studio</NavLink>}
          <NavLink to="/viewer"><span>◉</span> Knowledge base</NavLink>
        </nav>
        <div className="profile">
          <span className="avatar">{user.name.split(' ').map((part) => part[0]).join('')}</span><strong>{user.name}</strong><small>{roleLabels[user.role]} · @{user.username}</small>
          <button className="logout" onClick={logout}>Log out</button>
        </div>
      </aside>
      <main className="content"><Outlet /></main>
    </div>
  );
}
