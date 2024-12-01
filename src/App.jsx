import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./assets/css/style.css";
import "./assets/css/animate/animate.css";
import "./assets/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import Services from "./Components/Services/Services";
import MenuTab from "./Components/Menu/MenuTab";
import Booking from "./Components/Pages/Booking";
import Ourteam from "./Components/Pages/Ourteam";
import Contact from "./Components/Contact/Contact";
import TestimonialTab from "./Components/Pages/TestimonialTab";
import Login from "./Auth/Login";
import PrivateRoute from "./Auth/PrivateRoute";
import Register from "./Auth/Register";
import Terms from "./Components/Terms/Terms";
import Privacy from "./Components/Privacy/Privacy";
import AdminLogin from "./Auth/AdminLogin";
import AdminRoute from "./Auth/AdminRoute";
import AdminPanel from "./Admin/AdminPanel";
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; 
import AdMenu from "./Admin/Menu/AdMenu";
import AdminTable from "./Admin/Tables/AdminTable";
import Report from "./Admin/Reports/Report";
import MenuReports from "./Admin/MenuReports/MenuReports";
import AdminContact from "./Admin/AdminContact/AdminContact";

const App = () => {
  const about = "About Us";
  const services = "Services";
  const foodmenu = "Food Menu";
  const booking = "Booking";
  const ourteam = "Our Team";
  const testimonial = "Testimonial";
  const contact = "Contact Us";
  const terms = "Terms & Conditions";
  const privacy = "Privacy & Policy";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);
  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setIsAuthenticated(true);
    setUserData(user);
    console.log(user)
  };
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/" element={<Login onLogin={handleLogin} />} />{" "}
        <Route path="/register" element={<Register />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/home" user={userData}  element={<Home />} />
        <Route path="/about" element={<About props={about} />} />
        <Route path="/services" element={<Services props={services} />} />
        <Route path="/menu" element={<MenuTab props={foodmenu} user={userData}/>} />
        <Route path="/booking" element={<Booking props={booking} user={userData}  />} />
        <Route path="/team" element={<Ourteam props={ourteam} />} />
        <Route
          path="/testimonial"
          element={<TestimonialTab props={testimonial} />}
        />
        <Route path="/contact" element={<Contact props={contact} />} />
        <Route path="/terms" element={<Terms props={terms} />} />
        <Route path="/privacy" element={<Privacy props={privacy} />} />
        {/* Admin */}
        <Route 
          path="/admin" 
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          } 
        />
        <Route 
          path="/adminmenu" 
          element={
            <AdminRoute>
              <AdMenu />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admintable" 
          element={
            <AdminRoute>
              <AdminTable />
            </AdminRoute>
          } 
        />
        <Route 
          path="/reports" 
          element={
            <AdminRoute>
              <Report />
            </AdminRoute>
          } 
        />
        <Route 
          path="/weekreports" 
          element={
            <AdminRoute>
              <MenuReports />
            </AdminRoute>
          } 
        />
        <Route 
          path="/admincontact" 
          element={
            // <AdminRoute>
              <AdminContact />
            // </AdminRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;
