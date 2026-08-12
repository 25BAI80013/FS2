import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { roles } from '../data/seed';

const permissionText = {
  admin: 'You can manage users, edit content, and view all published content.',
  editor: 'You can create and edit content, and view all published content.',
  viewer: 'You can view published content only.',
};
export default function DashboardPage() {
  const { user } = useAuth();
  const { users, articles, auditEvents } = useWorkspace();
  const published = articles.filter((article) => article.status === 'published').length;
  const recentEvents = auditEvents.slice(0, 4);
  const nextPath = user.role === 'admin' ? '/admin' : user.role === 'editor' ? '/editor' : '/viewer';
  const nextLabel = user.role === 'admin' ? 'Manage access' : user.role === 'editor' ? 'Open content studio' : 'Browse knowledge base';
  return <>
    <div className="heading dashboard-heading"><div><div className="eyebrow">SECURE WORKSPACE</div><h1>Good morning, {user.name.split(' ')[0]}.</h1><p>{permissionText[user.role]}</p></div><span className={`pill ${roles[user.role].color}`}>{roles[user.role].label}</span></div>
    <section className="stats-grid"><article><span>Active accounts</span><strong>{users.filter((member) => member.status === 'active').length}</strong><small>Across all roles</small></article><article><span>Published articles</span><strong>{published}</strong><small>Available to viewers</small></article><article><span>Your permissions</span><strong>{user.role === 'admin' ? 'All' : user.role === 'editor' ? 'Edit' : 'Read'}</strong><small>Role-driven access</small></article></section>
    <section className="dashboard-columns"><article className="panel session-panel"><div className="section-heading"><div><div className="eyebrow">YOUR SESSION</div><h2>Identity verified</h2></div><span className="status-dot">Active</span></div><dl><div><dt>Account</dt><dd>{user.username}</dd></div><div><dt>Access level</dt><dd>{roles[user.role].label}</dd></div><div><dt>Token subject</dt><dd>{user.sub}</dd></div></dl><Link className="primary link-button" to={nextPath}>{nextLabel} <span>→</span></Link></article>
      <article className="panel"><div className="section-heading"><div><div className="eyebrow">ACTIVITY</div><h2>Recent audit trail</h2></div></div><div className="activity-list">{recentEvents.map((event) => <div className="activity" key={event.id}><span className="activity-mark" /><div><strong>{event.actor}</strong><p>{event.action}</p></div><time>{new Date(event.occurredAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</time></div>)}</div></article></section>
  </>;
}
