import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('syncuniUser');
    return saved ? JSON.parse(saved) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('syncuniToken') || null);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Giriş uğursuz oldu.');
    _persist(data.user, data.token);
    return data.user;
  };

  const register = async (payload) => {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Qeydiyyat uğursuz oldu.');
    _persist(data.user, data.token);
    return data.user;
  };

  const activateStudent = async (email, password) => {
    const res = await fetch(`${API_URL}/auth/student/activate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Aktivasiya uğursuz oldu.');
    _persist(data.user, data.token);
    return data.user;
  };

  const _persist = (userData, tkn) => {
    setUser(userData);
    setToken(tkn);
    localStorage.setItem('syncuniUser', JSON.stringify(userData));
    localStorage.setItem('syncuniToken', tkn);
  };

  const logout = (redirectFn) => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('syncuniUser');
    localStorage.removeItem('syncuniToken');
    if (redirectFn) redirectFn('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, activateStudent, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
