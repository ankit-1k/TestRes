import React from "react";

const tiem = () => {
  return (
    <div>
      <div>
        <div
          className="container-xxl py-5 px-0 wow fadeInUp"
          data-wow-delay="0.1s"
        >
          <div className="row g-0">
            <div className="col-md-6">
              <div className="video">
                <button
                  type="button"
                  className="btn-play"
                  data-bs-toggle="modal"
                  data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                  data-bs-target="#videoModal"
                >
                  <span></span>
                </button>
              </div>
            </div>
            <div className="col-md-6 bg-dark d-flex align-items-center">
              <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
                <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                  Reservation
                </h5>
                <h1 className="text-white mb-4">Book A Table Online</h1>
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="name"
                          className="form-control"
                          id="name"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="name">Your Name</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          name="email"
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="email">Your Email</label>
                      </div>
                    </div>
                    {/* <div className="col-md-6">
                                        <div className="form-floating date" id="date3" data-target-input="nearest">
                                            <input type="datetime-local" name="datetime" className="form-control datetimepicker-input" id="datetime" placeholder="Date & Time" value={formData.datetime} onChange={handleChange} required />
                                            <label htmlFor="datetime">Date & Time</label>
                                        </div>
                                    </div> */}
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          name="phone"
                          className="form-control"
                          id="phone"
                          placeholder="Phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                        <label htmlFor="phone">Phone No.</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          name="table"
                          className="form-select"
                          id="table1"
                          value={formData.table}
                          onChange={handleChange}
                          required
                        >
                          <option value="1">Table 1</option>
                          <option value="2">Table 2</option>
                          <option value="3">Table 3</option>
                          <option value="4">Table 4</option>
                        </select>
                        <label htmlFor="table1">No Of Table</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <select
                          name="people"
                          className="form-select"
                          id="select1"
                          value={formData.people}
                          onChange={handleChange}
                          required
                        >
                          <option value="1">People 1</option>
                          <option value="2">People 2</option>
                          <option value="3">People 3</option>
                          <option value="4">People 4</option>
                        </select>
                        <label htmlFor="select1">No Of People</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          name="specialRequest"
                          className="form-control"
                          placeholder="Special Request"
                          id="message"
                          style={{ height: "100px" }}
                          value={formData.specialRequest}
                          onChange={handleChange}
                        ></textarea>
                        <label htmlFor="message">Special Request</label>
                      </div>
                    </div>
                    <div className="col-12">
                      <button
                        className="btn btn-primary w-100 py-3"
                        type="submit"
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="videoModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content rounded-0">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Youtube Video
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="ratio ratio-16x9">
                  <iframe
                    title="view"
                    className="embed-responsive-item"
                    src=""
                    id="video"
                    allowFullScreen
                    allowScriptAccess="always"
                    allow="autoplay"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default tiem;
