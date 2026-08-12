export const roles = {
  admin: {
    label: 'Administrator',
    description: 'Full access to users, content, and audit records.',
    color: 'violet',
  },
  editor: {
    label: 'Editor',
    description: 'Can create, edit, publish, and read content.',
    color: 'cyan',
  },
  viewer: {
    label: 'Viewer',
    description: 'Can access published content only.',
    color: 'slate',
  },
};

export const seedUsers = [
  { id: 'u-admin', username: 'admin', password: 'admin123', name: 'Aarav Sharma', email: 'aarav@secureaccess.dev', role: 'admin', status: 'active' },
  { id: 'u-editor', username: 'editor', password: 'editor123', name: 'Esha Kapoor', email: 'esha@secureaccess.dev', role: 'editor', status: 'active' },
  { id: 'u-viewer', username: 'viewer', password: 'viewer123', name: 'Vihaan Mehta', email: 'vihaan@secureaccess.dev', role: 'viewer', status: 'active' },
  { id: 'u-noor', username: 'noor', password: 'noor123', name: 'Noor Singh', email: 'noor@secureaccess.dev', role: 'viewer', status: 'active' },
];

export const seedArticles = [
  { id: 'article-1', title: 'Securing client-side sessions', body: 'A practical overview of token expiry, route guards, and safe session restoration.', status: 'published', authorId: 'u-editor', author: 'Esha Kapoor', updatedAt: '2026-08-05T09:30:00.000Z' },
  { id: 'article-2', title: 'RBAC design principles', body: 'Roles should grant the minimum access a person needs. Enforce permissions at the API as well as in the interface.', status: 'published', authorId: 'u-admin', author: 'Aarav Sharma', updatedAt: '2026-08-04T13:15:00.000Z' },
  { id: 'article-3', title: 'Editorial calendar: August', body: 'Draft topics and publishing checkpoints for the product education series.', status: 'draft', authorId: 'u-editor', author: 'Esha Kapoor', updatedAt: '2026-08-06T07:20:00.000Z' },
];

export const seedAuditEvents = [
  { id: 'audit-1', actor: 'System', action: 'Demo workspace initialized', occurredAt: '2026-08-06T06:00:00.000Z' },
  { id: 'audit-2', actor: 'Aarav Sharma', action: 'Published “RBAC design principles”', occurredAt: '2026-08-04T13:15:00.000Z' },
];
