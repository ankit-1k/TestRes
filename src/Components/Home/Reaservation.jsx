import React, { useEffect, useState } from "react";
import axios from "axios";

const Reservation = ({ user }) => {
  const [tblArr, setTblArr] = useState([]);
  const [bookedTables, setBookedTables] = useState([]);
  const [display,setDisplay]=useState('d-none')
  const [formData, setFormData] = useState({
    name: user?.username || "",
    email: user?.email || "",
    datetime: "",
    phone: "",
    table: [],
    people: 1,
    duration: "1", 
    specialRequest: "",
  });
  useEffect(() => {
    if (formData.datetime && formData.duration) {
      checkTableAvailability();
    }
  }, [formData.datetime, formData.duration]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const checkTableAvailability = async () => {
    try {
      const response = await axios.get(
        "https://test-resbackend.vercel.app/api/check-availability",
        {
          params: {
            datetime: formData.datetime,
            duration: formData.duration,
          },
        }
      );
      setBookedTables(response.data.bookedTables || []);
    } catch (error) {
      console.error("Error checking table availability", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reservationData = { ...formData, table: tblArr };
      await axios.post("https://test-resbackend.vercel.app/api/reservations", reservationData);
      alert("Reservation successful!");
      console.log(reservationData)
    } catch (error) {
      console.error("Error saving reservation", error);
      alert("Failed to save reservation");
    }
  };

  const handleTableSelection = (tableNumber) => {
    if (!bookedTables.includes(tableNumber)) {
      setTblArr((prevTblArr) =>
        prevTblArr.includes(tableNumber)
          ? prevTblArr.filter((tbl) => tbl !== tableNumber)
          : [...prevTblArr, tableNumber]
      );
    }
  };
  useEffect(()=>{
    if(formData.datetime === ''){
      setDisplay('d-none')
    }else{
      setDisplay('')
    }
  })
  return (
    <div>
      {/* Reservation Form */}
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
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="datetime-local"
                        name="datetime"
                        className="form-control"
                        id="datetime"
                        placeholder="Date & Time"
                        value={formData.datetime}
                        onChange={handleChange}
                        required
                      />
                      <label htmlFor="datetime">Date & Time</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <select
                        name="duration"
                        className="form-select"
                        id="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                      >
                        <option value="1">1 hour</option>
                        <option value="2">2 hours</option>
                        <option value="3">3 hours</option>
                        <option value="4">4 hours</option>
                      </select>
                      <label htmlFor="duration">Duration</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-floating">
                      <input
                        type="tel"
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
                      <input
                        type="text"
                        name="table"
                        className="form-control"
                        id="table1"
                        placeholder="Selected Tables"
                        value={tblArr.join(", ")}
                        readOnly
                      />
                      <label htmlFor="table1">Selected Tables</label>
                    </div>
                    <button
                      type="button"
                      className={`btn btn-outline-secondary mt-2 ${display}`}
                      data-bs-toggle="modal"
                      data-bs-target="#seatModal" 
                    >
                      View Tables
                    </button>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 py-3">
                    Reserve
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for seat selection */}
      <div className="modal fade" id="seatModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Select Your Tables</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-wrap justify-content-center">
                {Array.from({ length: 10 }, (_, index) => index + 1).map(
                  (tableNumber) => (
                    <i
                      key={tableNumber}
                      className={`bi bi-tablet ${
                        tblArr.includes(tableNumber)
                          ? "text-primary"
                          : bookedTables.includes(tableNumber)
                          ? "text-danger"
                          : ""
                      }`}
                      style={{
                        fontSize: "2rem",
                        cursor: bookedTables.includes(tableNumber)
                          ? "not-allowed"
                          : "pointer",
                        padding: "10px",
                        border: tblArr.includes(tableNumber)
                          ? "2px solid blue"
                          : bookedTables.includes(tableNumber)
                          ? "2px solid red"
                          : "1px solid gray",
                        borderRadius: "5px",
                        margin: "10px",
                      }}
                      onClick={() => handleTableSelection(tableNumber)}
                    ></i>
                  )
                )}
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                onClick={checkTableAvailability}
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
