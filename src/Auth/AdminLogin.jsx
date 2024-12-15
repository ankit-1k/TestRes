import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "./../Components/Footer";
import axios from "axios";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State to manage error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://test-resbackend.vercel.app/api/login",
        {
          username,
          password,
        }
      );

      if (res.data.token) {
        console.log("Token:", res.data.token); // Log the token for debugging
        localStorage.setItem("token", res.data.token); // Save token in localStorage
        alert("Login successful");
        navigate("/admin"); // Redirect to the admin dashboard
      } else {
        alert("Token not received");
      }
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);

      // Check if error is due to invalid credentials or server issue
      if (err.response && err.response.status === 401) {
        setErrorMessage("Invalid credentials. Please try again.");
      } else {
        setErrorMessage("Server error. Please try again later.");
      }
    }
  };

  return (
    <div className="component">
      <Navbar />
      <div className="container">
        <div className="row mt-5">
          <div className="col-md-5 from">
            <form onSubmit={handleLogin} className="log-form res-mt-30">
              <h2 className="text-center mt-3 text-white">Admin Login</h2>
              {errorMessage && (
                <p className="text-danger">{errorMessage}</p>
              )}{" "}
              {/* Display error message if any */}
              <div className="mt-3">
                <label>Username:</label>
                <input
                  type="text"
                  value={username}
                  className="form-control"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="mt-2">
                <label>Password:</label>
                <input
                  type="password"
                  value={password}
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button className="btn btn-outline-success mt-2" type="submit">
                Login
              </button>
            </form>
          </div>
          <div className="col-md-7">
            <div className="ad-bg res-d-none"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;
