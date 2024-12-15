import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  
  // Redirect to login page if token doesn't exist
  if (!token) {
    return <Navigate to="/adminlogin" />;
  }

  // Otherwise, render protected content
  return <Outlet />;
};

export default ProtectedRoute;
