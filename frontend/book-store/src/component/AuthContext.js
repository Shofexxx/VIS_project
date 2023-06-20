import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    const savedCredentials = localStorage.getItem('credentials');
    if (savedCredentials) {
      const parsedCredentials = JSON.parse(savedCredentials);

      setCredentials(parsedCredentials);
      setIsAuthenticated(true);
      setUserRole('admin'); 
    }
  }, []);

  const login = (username, password) => {
    setIsAuthenticated(true);
    setCredentials({ username, password });

    localStorage.setItem('credentials', JSON.stringify({ username, password }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setCredentials(null);

    localStorage.removeItem('credentials');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, login, logout, setUserRole, credentials }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
