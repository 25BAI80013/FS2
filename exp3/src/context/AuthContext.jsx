import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { createMockJwt, decodeMockJwt } from '../auth/mockJwt';
import { seedUsers } from '../data/seed';

const AuthContext = createContext(null);
const TOKEN_KEY = 'secure-access-token';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    const decoded = token && decodeMockJwt(token);
    if (decoded) setUser(decoded);
    else localStorage.removeItem(TOKEN_KEY);
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    let storedUsers = seedUsers;
    try {
      const storedWorkspace = JSON.parse(localStorage.getItem('secure-access-workspace-v2'));
      if (storedWorkspace?.users) storedUsers = storedWorkspace.users;
    } catch { /* use seeded users */ }
    const matchedUser = storedUsers.find(
      (candidate) => candidate.username === username.trim().toLowerCase() && candidate.password === password,
    );
    if (!matchedUser) return { ok: false, message: 'Invalid username or password.' };

    const token = createMockJwt(matchedUser);
    const decoded = decodeMockJwt(token);
    localStorage.setItem(TOKEN_KEY, token);
    setUser(decoded);
    return { ok: true, user: decoded };
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setUser(null);
  };

  const value = useMemo(() => ({ user, isLoading, login, logout }), [user, isLoading]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
