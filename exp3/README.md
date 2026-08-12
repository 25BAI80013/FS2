# SecureAccess — JWT Authentication & RBAC

A polished Vite + React demonstration application for a JWT-based authentication and Role-Based Access Control (RBAC) lab. It is fully client-side and intentionally uses mock data so it can run immediately after installation.

## Start in VS Code

```bash
npm install
npm run dev
```

Vite will print a local URL (normally `http://localhost:5173`). To verify a production build, run:

```bash
npm run build
```

## Demo accounts

| Role | Username | Password | What it can do |
| --- | --- | --- | --- |
| Administrator | `admin` | `admin123` | Manage roles, inspect audit trail, create/edit/delete all articles |
| Editor | `editor` | `editor123` | Create, publish, edit and delete their own articles |
| Viewer | `viewer` | `viewer123` | Read published articles |

An extra user, `noor` / `noor123`, is available so the administrator can demonstrate role changes.

## Features implemented

- Mock JWT creation, Base64URL claim decoding, expiry validation, and localStorage session restoration.
- Context API authentication state with login, logout, and loading protection.
- React Router guards for authentication and nested role-only routes.
- Responsive role-aware navigation and an explicit 403 unauthorized screen.
- Persistent admin user-management screen, including role updates and an audit trail.
- Persistent editor content studio for creating drafts, publishing, editing and deleting content.
- Searchable viewer knowledge base that exposes published articles only.
- A reset control for restoring the demo workspace.

## Project layout

```text
src/
├── auth/mockJwt.js             # Mock token creation and validation
├── context/AuthContext.jsx     # Authentication/session state
├── context/WorkspaceContext.jsx# Users, content and audit data
├── components/                 # Layout and route guard
├── data/seed.js                # Initial demo data and role definitions
└── pages/                      # Login, dashboard, admin, editor and viewer pages
```

## Security note

This is a lab project—not a production authentication server. The generated token is JWT-shaped but deliberately unsigned, and mock credentials live in the browser. A real system must validate credentials and permissions on a server, sign/verify tokens using a secure algorithm, use HTTPS, enforce authorization at every API endpoint, and normally use secure `HttpOnly`, `Secure`, `SameSite` cookies for session tokens.
