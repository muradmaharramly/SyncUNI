import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('syncuniUser');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (role, redirectFn) => {

    let fakeUser = null;
    if (role === 'company') {
      fakeUser = { role: 'company', email: 'company@sync.uni', name: 'TechAz Company' };
    } else if (role === 'university') {
      fakeUser = { role: 'university', email: 'uni@sync.uni', name: 'BDU' };
    } else if (role === 'course') {
      fakeUser = { role: 'course', email: 'course@sync.uni', name: 'CodeAcademy Baku' };
    } else if (role === 'student') {
      fakeUser = { role: 'student', email: 'student@sync.uni', name: 'Aysel Məmmədova' };
    }

    if (fakeUser) {
      setUser(fakeUser);
      localStorage.setItem('syncuniUser', JSON.stringify(fakeUser));
      if (redirectFn) {
        redirectFn(`/dashboard/${role}`);
      }
    }
  };

  const logout = (redirectFn) => {
    setUser(null);
    localStorage.removeItem('syncuniUser');
    if(redirectFn) {
      redirectFn('/');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
