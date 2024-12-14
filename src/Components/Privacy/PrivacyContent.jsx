import React from "react";
import privacyImg from "./../../assets/img/privacy.gif";
const PrivacyContent = () => {
  return (
    <div>
      <div className="container light-bg pt-5">
        <div className="row">
          <div className="col-md-5">
            <img src={privacyImg} alt="Terms & Conditions" className="w-100" />
          </div>
          <div className="col-md-7">
            <h4>Last updated: 11/10/2024</h4>
            <p>
              We value your privacy and are committed to protecting your
              personal information.
            </p>
            <h5>1. Information Collection</h5>
            <p>
              Personal Data: We collect data such as names, emails, and phone
              numbers during bookings/orders.
            </p>
            <p>
              Usage Data: We gather non-personal data like browser type, visit
              duration, and IP addresses automatically.
            </p>
          </div>
        </div>
      </div>
      <div className="container pt-5 pb-5 bg-dark text-white">
        <div className="row">
          <div className="col-md-6">
            <h5 className="text-white">2. Use of Information</h5>
            <p>
              <span className="fw-bold text-warning">Service Delivery:</span>
              Personal data is used to process orders, bookings, and communicate
              with customers.
            </p>
            <p>
              <span className="fw-bold text-warning">Cancellation Policy:</span>{" "}
              We kindly ask that you provide at least 24 hours' notice if you
              need to cancel or reschedule your booking. Failure to cancel may
              result in a cancellation fee.
            </p>
          </div>
          <div className="col-md-6">
            <h5 className="text-white">3. Data Sharing</h5>
            <p>
              <span className="fw-bold text-warning">
                Third-Party Services:
              </span>{" "}
              We may share data with trusted partners for payment processing and
              website analytics.
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
        <div className="row mt-4">
          <div className="col-md-6">
            <h5 className="text-white">4. Data Security</h5>
            <p>
              <span className="fw-bold text-warning">Protection:</span>
              We use encryption and security measures to safeguard your data
              from unauthorized access.
            </p>
            <p>
              <span className="fw-bold text-warning">Retention: </span>
              Personal data is stored only as long as necessary for service
              delivery or legal requirements.
            </p>
          </div>
          <div className="col-md-6">
            <h5 className="text-white">6. Changes to Privacy Policy</h5>
            <p>
              <span className="fw-bold text-warning">Updates:</span> We may
              revise this policy periodically. Changes will be posted on this
              page immediately.
            </p>
            <p>
              <span className="fw-bold text-warning">Notification:</span>{" "}
              Significant changes will be communicated via email or website
              notices to keep you informed.
            </p>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col">
            <h4>Contact Us :</h4>
            <p>
              If you have questions regarding this Privacy Policy, contact us
              at: XXXXXX
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyContent;
