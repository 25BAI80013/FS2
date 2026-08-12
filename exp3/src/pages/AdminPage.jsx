import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { roles } from '../data/seed';

export default function AdminPage() {
  const { user } = useAuth();
  const { users, auditEvents, updateUserRole, resetDemo } = useWorkspace();
  const [notice, setNotice] = useState('');
  const saveRole = (userId, role) => {
    const result = updateUserRole(userId, role);
    setNotice(result.ok ? 'Role updated. The change has been recorded in the audit trail.' : result.message);
  };
  return <><div className="heading"><div><div className="eyebrow">ADMINISTRATION</div><h1>Access control</h1><p>Assign least-privilege roles and review changes across the workspace.</p></div><button className="secondary" onClick={() => { resetDemo(); setNotice('Demo workspace reset to its original state.'); }}>Reset demo data</button></div>
    {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice('')} aria-label="Dismiss notice">×</button></div>}
    <section className="panel table-panel"><div className="section-heading"><div><div className="eyebrow">USER DIRECTORY</div><h2>{users.length} accounts</h2></div></div><div className="table-wrap"><table><thead><tr><th>Member</th><th>Current role</th><th>Permission summary</th><th>Change role</th></tr></thead><tbody>{users.map((member) => <tr key={member.id}><td><div className="member"><span className="member-avatar">{member.name.split(' ').map((part) => part[0]).join('')}</span><div><strong>{member.name}</strong><small>{member.email}</small></div></div></td><td><span className={`role-chip ${roles[member.role].color}`}>{roles[member.role].label}</span></td><td>{roles[member.role].description}</td><td><select value={member.role} disabled={member.id === user.id} onChange={(event) => saveRole(member.id, event.target.value)} aria-label={`Change ${member.name}'s role`}>{Object.entries(roles).map(([role, info]) => <option key={role} value={role}>{info.label}</option>)}</select></td></tr>)}</tbody></table></div></section>
    <section className="panel audit-panel"><div className="section-heading"><div><div className="eyebrow">SYSTEM LOG</div><h2>Latest access events</h2></div></div><div className="audit-grid">{auditEvents.slice(0, 6).map((event) => <div className="audit-entry" key={event.id}><span>●</span><div><strong>{event.actor}</strong><p>{event.action}</p></div><time>{new Date(event.occurredAt).toLocaleString()}</time></div>)}</div></section>
  </>;
}
