import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import ContentStudioPage from './pages/ContentStudioPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import UnauthorizedPage from './pages/UnauthorizedPage';

export default function App() { return <Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/unauthorized" element={<UnauthorizedPage />} />
  <Route element={<ProtectedRoute />}><Route element={<AppLayout />}>
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/viewer" element={<KnowledgeBasePage />} />
    <Route element={<ProtectedRoute allowedRoles={['admin', 'editor']} />}><Route path="/editor" element={<ContentStudioPage />} /></Route>
    <Route element={<ProtectedRoute allowedRoles={['admin']} />}><Route path="/admin" element={<AdminPage />} /></Route>
  </Route></Route>
  <Route path="/" element={<Navigate to="/dashboard" replace />} /><Route path="*" element={<Navigate to="/dashboard" replace />} />
</Routes>; }
