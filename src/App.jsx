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
import Terms from "./Components/Terms/Terms";
import Privacy from "./Components/Privacy/Privacy";
import AdminLogin from "./Auth/AdminLogin";
import AdminPanel from "./Admin/AdminPanel";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import AdMenu from "./Admin/Menu/AdMenu";
import AdminTable from "./Admin/Tables/AdminTable";
import Report from "./Admin/Reports/Report";
import MenuReports from "./Admin/MenuReports/MenuReports";
import AdminContact from "./Admin/AdminContact/AdminContact";
import ProtectedRoute from "./Auth/ProtectedRoute";

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

  return (
    <Router>
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About props={about} />} />
        <Route path="/services" element={<Services props={services} />} />
        <Route path="/menu" element={<MenuTab props={foodmenu} />} />
        <Route path="/booking" element={<Booking props={booking} />} />
        <Route path="/team" element={<Ourteam props={ourteam} />} />
        <Route
          path="/testimonial"
          element={<TestimonialTab props={testimonial} />}
        />
        <Route path="/contact" element={<Contact props={contact} />} />
        <Route path="/terms" element={<Terms props={terms} />} />
        <Route path="/privacy" element={<Privacy props={privacy} />} />
        {/* Admin */}
        {/* <Route 
          path="/admin" 
          element={
              <AdminPanel />
          } 
        /> */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminPanel />} />
        </Route>


        <Route path="/adminmenu" element={<AdMenu />} />
        <Route path="/admintable" element={<AdminTable />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/weekreports" element={<MenuReports />} />
        <Route path="/admincontact" element={<AdminContact />} />
      </Routes>
    </Router>
  );
};

export default App;
