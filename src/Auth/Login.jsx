import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import Footer from './../Components/Footer'
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("a@g.co");
  const [password, setPassword] = useState("a");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/login",
        { email, password }
      );
      console.log("Response:", response.data); // Check the response

      if (response.status === 200) {
        const { username, email } = response.data.user;
        alert(response.data.message);
        onLogin({ username, email }); // Pass user data to onLogin
        navigate("/home"); // Redirect to home
      }
    } catch (error) {
      console.error(
        "Login error:",
        error.response ? error.response.data : error.message
      );
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <div className="component">
        <Navbar />
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-5 from">
              <form onSubmit={handleSubmit} className="log-form res-mt-30">
                <h2 className="text-center mt-3 text-white">User Login</h2>
                <div className="mt-3">
                  <label>Username:</label>
                  <input
                    type="email"
                    value={email}
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
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
                    placeholder="Password"
                    required
                  />
                </div>
                <button className="btn btn-outline-success mt-2" type="submit">
                  Login
                </button>
                <p
                  className="text-success mt-2 text-center"
                  onClick={() => navigate("/adminlogin")}
                >
                  Admin Login ?
                </p>
              </form>
            </div>
            <div className="col-md-7">
              <div className="ad-bg res-d-none"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          placeholder="Email" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p onClick={()=>navigate('/adminlogin')}>admin</p> */}
    </div>
  );
};

export default Login;
