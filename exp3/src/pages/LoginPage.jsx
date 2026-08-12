import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = (event) => {
    event.preventDefault();
    const result = login(username, password);
    if (!result.ok) return setError(result.message);
    navigate(location.state?.from?.pathname || '/dashboard', { replace: true });
  };
  return <div className="login-page"><section className="login-card">
    <div className="eyebrow">JWT + RBAC DEMO</div><h1>Welcome back</h1><p>Sign in to open your role-based workspace.</p>
    <form onSubmit={handleSubmit}>
      <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required /></label>
      <label>Password<input type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" required /></label>
      {error && <p className="error" role="alert">{error}</p>}
      <button className="primary" type="submit">Sign in securely</button>
    </form>
    <div className="credentials"><strong>Demo accounts</strong><span>admin / admin123 · editor / editor123 · viewer / viewer123</span></div>
  </section></div>;
}
