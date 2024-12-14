import React from 'react';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const isAdminAuthenticated = !!localStorage.getItem('adminLoggedIn'); // Check if admin is logged in

  return isAdminAuthenticated ? children : <Navigate to="/adminlogin" />;
};

export default AdminRoute;
