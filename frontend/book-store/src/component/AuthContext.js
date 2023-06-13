import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [credentials, setCredentials] = useState(null);

  useEffect(() => {
    // Check if there are saved credentials in local storage
    const savedCredentials = localStorage.getItem('credentials');
    if (savedCredentials) {
      const parsedCredentials = JSON.parse(savedCredentials);
      // Set the stored credentials and authenticate the user
      setCredentials(parsedCredentials);
      setIsAuthenticated(true);
      setUserRole('admin'); // Assuming admin role for simplicity, modify as needed
    }
  }, []);

  const login = (username, password) => {
    setIsAuthenticated(true);
    setCredentials({ username, password });
    // Save the credentials in local storage
    localStorage.setItem('credentials', JSON.stringify({ username, password }));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('');
    setCredentials(null);
    // Clear the stored credentials from local storage
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
