import React, { useState } from "react";
import axios from "axios";
import Navbar from "../Components/Navbar/Navbar";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/auth/register",
        { username, email, password, phone }
      );
      alert(response.data.message);
    } catch (error) {
      setError("Error in registration");
    }
  };

  return (
    <>
      <div className="component">
        <Navbar />
        <div className="container">
          <div className="row mt-5">
            <div className="col-md-7 from">
              <form onSubmit={handleSubmit} className="log-form res-mt-30">
                <h2 className="text-center mt-3 text-white">Register</h2>
                <div className="mt-3">
                  <label>Name:</label>
                  <input
                    type="Name"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="mt-2">
                  <label>Email:</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="mt-2">
                      <label>Phone:</label>
                      <input
                        type="text"
                        className="form-control"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="mt-2">
                      <label>Password:</label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                      />
                    </div>
                  </div>
                </div>
                <button className="btn btn-outline-success mt-2" type="submit">
                  Register
                </button>
                <p
                  className="text-success mt-2 text-center"
                  onClick={() => navigate("/login")}
                >
                  Login ?
                </p>
              </form>
            </div>
            <div className="col-md-5">
              <div className="ad-bg res-d-none"></div>
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default Register;
