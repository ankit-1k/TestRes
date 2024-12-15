import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Corrected named import

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

    try {
      // Option 1: Validate token on the server
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
          setIsValid(false);
          setLoading(false);
        });

      // Option 2: Decode the token and check expiration (using jwt-decode)
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        setIsValid(false); // Token expired
      } else {
        setIsValid(true); // Token is valid
      }
    } catch (error) {
      console.error("Invalid token:", error);
      setIsValid(false);
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking token
  }

  if (!isValid) {
    return <Navigate to="/adminlogin" />; // Redirect to login if token is invalid or expired
  }

  return <Outlet />; // Render the protected content if valid
};

export default ProtectedRoute;
