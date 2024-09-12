import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (accessToken) => {
    localStorage.setItem('token', accessToken);
    setIsAuthenticated(true);
    fetchUserData();
    navigate('/dashboard');
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/auth');
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await fetch('http://localhost:8000/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setIsAuthenticated(true);
      } else {
        console.error(data);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};