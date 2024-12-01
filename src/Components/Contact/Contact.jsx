import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import CBanner from "../Common/CBanner";
import Footer from "../Footer";
import axios from "axios";

const Contact = ({ props }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting data...", formData);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/contact",
        formData
      );
      console.log(response); // Log the full response from the backend
      alert("Message sent successfully");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response || error.message || error
      );
      alert("Error sending message. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <CBanner props={props} />
      <div class="container-xxl py-5">
        <div class="container">
          <div class="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 class="section-title ff-secondary text-center text-primary fw-normal">
              Contact Us
            </h5>
            <h1 class="mb-5">Contact For Any Query</h1>
          </div>
          <div class="row g-4">
            <div class="col-12">
              <div class="row gy-4">
                <div class="col-md-4">
                  <h5 class="section-title ff-secondary fw-normal text-start text-primary">
                    Booking
                  </h5>
                  <p>
                    <i class="fa fa-envelope-open text-primary me-2"></i>
                    book@example.com
                  </p>
                </div>
                <div class="col-md-4">
                  <h5 class="section-title ff-secondary fw-normal text-start text-primary">
                    General
                  </h5>
                  <p>
                    <i class="fa fa-envelope-open text-primary me-2"></i>
                    info@example.com
                  </p>
                </div>
                <div class="col-md-4">
                  <h5 class="section-title ff-secondary fw-normal text-start text-primary">
                    Technical
                  </h5>
                  <p>
                    <i class="fa fa-envelope-open text-primary me-2"></i>
                    tech@example.com
                  </p>
                </div>
              </div>
            </div>
            <div class="col-md-6 wow fadeIn" data-wow-delay="0.1s">
              <iframe
                class="position-relative rounded w-100 h-100"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.793983322195!2d78.4451410738305!3d17.44054450127427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9145d0212d5d%3A0x90330e10650a2c48!2sParadise%20Biryani%20%7C%20SR%20Nagar!5e1!3m2!1sen!2sin!4v1731753875583!5m2!1sen!2sin"
                frameborder="0"
                style={{ minHeight: "350px", border: 0 }}
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
              {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.793983322195!2d78.4451410738305!3d17.44054450127427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9145d0212d5d%3A0x90330e10650a2c48!2sParadise%20Biryani%20%7C%20SR%20Nagar!5e1!3m2!1sen!2sin!4v1731753875583!5m2!1sen!2sin" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> */}
            </div>
            <div className="col-md-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          placeholder="Subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                        />
                        <label htmlFor="subject">Subject</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a message here"
                          id="message"
                          style={{ height: "150px" }}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                        />
                        <label htmlFor="message">Message</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
