import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const ProtectedRoute = () => {
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setIsValid(false);
      setLoading(false);
      return;
    }

    axios
      .get("https://test-resbackend.vercel.app/api/validate", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setIsValid(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Token validation failed:", error);
        setIsValid(false);  // Token invalid
        setLoading(false);
      });
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isValid) {
    return <Navigate to="/adminlogin" />; // Redirect to login if token is invalid or expired
  }

  return <Outlet />; // Render the protected content if valid
};

export default ProtectedRoute;
