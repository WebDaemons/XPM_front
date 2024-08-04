import React, { createContext, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout as logoutAction } from '../store/slices/authSlice.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const login = (credentials) => {
    dispatch(loginUser(credentials));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
