import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState(localStorage.getItem('userId') || null);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
  const navigate = useNavigate();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
      setUserRole(localStorage.getItem('userRole'));
      setUserId(localStorage.getItem('userId'));
      setFirstName(localStorage.getItem('firstName'));
      setLastName(localStorage.getItem('lastName'));
    }
  }, []);

  const handleLogin = (token, role, userId, firstName, lastName) => {
    setIsLoggedIn(true);
    setUserRole(role);
    setUserId(userId);
    setFirstName(firstName);
    setLastName(lastName);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userId', userId);
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName', lastName);
    localStorage.setItem('token', token); // Add token storage
    navigate(getRedirectPath(role));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setUserId(null);
    setFirstName('');
    setLastName('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('token'); // Add token removal
    navigate('/');
  };

  const getRedirectPath = (role) => {
    switch (role) {
      case 'ADMIN':
        return '/admin';
      case 'PRODUCT_PARTNER':
        return '/product_partner';
      case 'USER':
        return '/user';
      default:
        return '/';
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, userId, firstName, lastName, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
