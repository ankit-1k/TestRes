import React from "react";
import "./adminfooter.css";
import { useNavigate } from "react-router-dom";
const AdminFooter = () => {
    const navigate=useNavigate()

  return (
    <>
      <footer className="bg-dark text-light pt-4 mt-5 footer">
        <div className="container">
          <div className="row">
            {/* About Section */}
            <div className="col-md-4 mb-3">
              <h5 className="text-warning">About Us</h5>
              <p className="muted-text-1">
                Teston Restaurant Admin Panel helps you manage all operations
                seamlessly. Your satisfaction, our priority!
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="col-md-4 mb-3">
              <h5 className="text-warning">Quick Links</h5>
              <ul className="list-unstyled footer-list">
                <li>
                  <span
                    onClick={()=>navigate('/adminmenu')}
                    className="text-decoration-none"
                  >
                    Add Food Items
                  </span>
                </li>
                <li>
                  <span
                    onClick={()=>navigate('/admintable')}
                    className="text-decoration-none"
                  >
                    Book Tables
                  </span>
                </li>
                <li>
                  <span
                    onClick={()=>navigate('/reports')}
                    className="text-decoration-none"
                  >
                   Table Booking Reports
                  </span>
                </li>
                <li>
                  <span
                    onClick={()=>navigate('/weekreports')}
                    className="text-decoration-none"
                  >
                    Food Orders Reports
                  </span>
                </li>
                <li>
                  <span
                    onClick={()=>navigate('/admincontact')}
                    className="text-decoration-none"
                  >
                    View Contacts
                  </span>
                </li>
              </ul>
            </div>

            {/* Social Media Section */}
            <div className="col-md-4 mb-3 admin-footer-social">
              <h5 className="text-warning">Follow Us</h5>
              <div>
                <a
                  href="https://facebook.com"
                  className=" me-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-facebook icon fs-4"></i>
                </a>
                <a
                  href="https://twitter.com"
                  className=" me-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-twitter fs-4"></i>
                </a>
                <a
                  href="https://instagram.com"
                  className=" me-3"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-instagram fs-4"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  className=""
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-linkedin fs-4"></i>
                </a>
              </div>
            </div>
          </div>

          <hr className="bg-light" />
          {/* Copyright Section */}
          <div className="text-center py-3">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Teston Restaurant. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default AdminFooter;
