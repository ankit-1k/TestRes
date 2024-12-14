import React from "react";
import termsImg from "./../../assets/img/terms_and_conditions.gif";
const TermsContent = () => {
  const services = [
    {
      id: 1,
      title: "Payment Methods",
      description:
        "We accept major credit and debit cards, and online payments via our website.",
      delay: "0.1s",
    },
    {
      id: 2,
      title: "Pricing",
      description:
        "All prices include taxes and may change without prior notice.",
      delay: "0.3s",
    },
    {
      id: 3,
      title: "Refunds",
      description:
        "Refunds for cancellations follow our policy and may take [X] days to process.",
      delay: "0.5s",
    },
    {
      id: 4,
      title: "Service Charges",
      description:
        " A [X]% non-refundable service charge applies and is displayed before payment.",
      delay: "0.7s",
    },
  ];

  return (
    <div>
      <div className="container light-bg pt-5">
        <div className="row">
          <div className="col-md-5">
            <img src={termsImg} alt="Terms & Conditions" className="w-100" />
          </div>
          <div className="col-md-7">
            <h4>Last updated: 11/10/2024</h4>
            <p>
              Welcome to <span className="text-danger fw-bold">TasteOn</span>{" "}
              Restaurant. These Terms and Conditions outline the rules and
              regulations for the use of our website and services, including
              online food booking and table reservations.
            </p>
            <h5>1. General Terms</h5>
            <p>
              By accessing and using our website, you agree to comply with these
              Terms and Conditions. Please read them carefully. If you do not
              agree to any of these terms, please discontinue the use of our
              services.
            </p>
          </div>
        </div>
      </div>
      <div className="container pt-5 pb-5 bg-dark text-white">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-white">2. Online Table Booking</h5>
            <p>
              <span className="fw-bold text-warning">Availability:</span> Table
              bookings are subject to availability. We strive to accommodate
              your preferences, but certain times or dates may not be available,
              particularly during peak hours or special events.
            </p>
            <p>
              <span className="fw-bold text-warning">
                Booking Confirmation:
              </span>{" "}
              Once you complete your booking, you will receive a confirmation
              via email or SMS. This confirmation must be presented upon
              arrival.
            </p>
            <p>
              <span className="fw-bold text-warning">Cancellation Policy:</span>{" "}
              We kindly ask that you provide at least 24 hours' notice if you
              need to cancel or reschedule your booking. Failure to cancel may
              result in a cancellation fee.
            </p>
          </div>
          <div className="col-md-6">
            <h5 className="text-white">3. Online Food Booking</h5>
            <p>
              <span className="fw-bold text-warning">Order Confirmation:</span>{" "}
              When you place an order through our website, you will receive a
              confirmation via email or SMS. Please review your order carefully
              before confirming, as changes may not be possible after
              confirmation.
            </p>
            <p>
              <span className="fw-bold text-warning">
                Delivery and Pickup Times:
              </span>{" "}
              We make every effort to deliver or prepare your food within the
              estimated time frame. However, during busy periods or unforeseen
              circumstances, delays may occur. We will notify you in case of any
              significant delays.
            </p>
            <p>
              <span className="fw-bold text-warning">
                Cancellation of Orders:
              </span>{" "}
              Orders can be canceled up to [X] minutes after confirmation. After
              this time, cancellations or refunds may not be available as the
              preparation process will have begun.
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h4>4. Payment Terms</h4>
        <div className="row g-4">
          {services.map((service) => (
            <div
              className="col-lg-3 col-sm-6 wow fadeInUp"
              data-wow-delay={service.delay}
              key={service.id}
            >
              <div className="service-item rounded pt-3">
                <div className="p-4">
                  {/* <i
                    className={`fa fa-3x ${service.icon} text-primary mb-4`}
                  ></i> */}
                  <h5>{service.title}</h5>
                  <p>{service.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h4>Contact Us :</h4>
            <p>
              If you have any questions about these Terms and Conditions, please
              contact us at: XXXXX
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsContent;
