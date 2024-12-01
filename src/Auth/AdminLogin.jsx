import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "./../Components/Footer";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:4000/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (data.success) {
      localStorage.setItem("adminLoggedIn", "true"); // Store login status
      navigate("/admin"); // Redirect to admin panel
    } else {
      alert("Invalid credentials");
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
              <p
                className="text-success mt-2 text-center"
                onClick={() => navigate("/login")}
              >
                User Login ?
              </p>
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
