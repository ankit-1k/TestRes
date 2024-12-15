import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";
import {jwtDecode} from "jwt-decode"; // Correct import

const ProtectedRoute = () => {
  const [isValid, setIsValid] = useState(true);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // Retrieve token from localStorage

  useEffect(() => {
    if (!token) {
      setIsValid(false); // No token, set as invalid
      setLoading(false);
      return;
    }

    // Option 1: Validate token on the server
    axios
      .get("https://test-resbackend.vercel.app/api/validate", {
        headers: { Authorization: `Bearer ${token}` }, // Send token as Bearer token
      })
      .then((response) => {
        setIsValid(true); // Token is valid
        setLoading(false);
      })
      .catch((error) => {
        console.error("Token validation failed:", error.response ? error.response.data : error.message);
        setIsValid(false); // Token validation failed
        setLoading(false);
      });

    // Option 2: Decode token and check expiration (using jwt-decode)
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;  // Current time in seconds
      if (decoded.exp < currentTime) {
        setIsValid(false); // Token expired
      } else {
        setIsValid(true); // Token is still valid
      }
    } catch (error) {
      console.error("Invalid token:", error);
      setIsValid(false); // Invalid token format
      setLoading(false);
    }
  }, [token]);

  if (loading) {
    return <div>Loading...</div>; // Show loading while checking token
  }

  if (!isValid) {
    return <Navigate to="/adminlogin" />; // Redirect to login if token is invalid or expired
  }

  return <Outlet />; // Render protected content if token is valid
};

export default ProtectedRoute;
