import React from "react";
import AdHeader from "./header/AdHeader";
import "./admin.css"; // Assuming you will create a CSS file for styling
import burgerImg from "./../img/burger.png";
import AdminFooter from "./AdminFooter/AdminFooter";

const AdminPanel = () => {
  const adminData = [
    {
      title: "Add Food Items",
      description: "Easily manage and add food items to the menu.",
    },
    {
      title: "Book Tables",
      description: "Manage customer reservations and table bookings.",
    },
    {
      title: "Contact Customers",
      description: "Get all contacts about customers.",
    },
    {
      title: "Check Business Charts",
      description:
        "View and analyze restaurant performance with visual charts.",
    },
  ];

  return (
    <div>
      <AdHeader />

      {/* Hero Section */}
      <div className="bg-dark">
        <div className="container pt-5 pb-5">
          <div className="row align-items-center">
            <div className="col-md-7">
              <section className="hero">
                <div className="hero-content">
                  <h1 className="hero-title text-warning fw-bold">
                    Welcome to the Admin Panel
                  </h1>
                  <p className="hero-description">
                    Manage Teston Restaurant's operations with ease
                  </p>
                </div>
              </section>
            </div>
            <div className="col-md-5 d-flex justify-content-center">
              <img
                src={burgerImg}
                alt="Burger"
                className="img-fluid bounce-image"
                style={{ maxHeight: "300px", width: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="admin-info pt-4">
          <h2 className="mt-5">What you can do:</h2>
          <div className="row">
            {adminData.map((item, index) => (
              <div key={index} className="col-12 col-sm-6 col-md-3 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AdminFooter />
    </div>
  );
};

export default AdminPanel;
