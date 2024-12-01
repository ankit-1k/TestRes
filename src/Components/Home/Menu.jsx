import React, { useEffect, useState } from "react";

const Menu = ({ user }) => {
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [table, setTable] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [emtyDnone, setEmtDnone] = useState("d-none");
  const [selectedTable, setSelectedTable] = useState(null);
  const [foodMenu, setFoodMenu] = useState([]); // State for food menu

  useEffect(() => {
    // Fetch the food menu data
    const fetchFoodMenu = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/getmenu"); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setFoodMenu(data); // Set the fetched data to state
        } else {
          console.log("Failed to fetch menu data");
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchFoodMenu(); // Call the fetch function

    // User name handling and cart visibility
    if (user) {
      setName(user.username);
    }
    if (cart.length === 0) {
      setEmtDnone("d-none");
    } else {
      setEmtDnone("d-block");
    }
  }, [cart, user]); // Add user to the dependency array

  const addToCart = (item) => {
    setCart([...cart, item]);
  };
  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };
  const handleTableChange = (event) => {
    setSelectedTable(event.target.value);
  };
  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + parseFloat(item.price), 0)
      .toFixed(2);
  };
  const placeOrder = async () => {
    const orderData = {
      name: name,
      table: selectedTable,
      items: cart,
      total: calculateTotal(),
    };

    try {
      const response = await fetch("http://localhost:4000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.message);
        setCart([]); // Clear the cart after placing the order
      } else {
        console.log("Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Food Menu
            </h5>
            <h1 className="mb-5">Most Popular Items</h1>
          </div>
          <div
            className="tab-class text-center wow fadeInUp position-relative"
            data-wow-delay="0.1s"
          >
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                  data-bs-toggle="pill"
                  href="#tab-1"
                >
                  <i className="fa fa-coffee fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Popular</small>
                    <h6 className="mt-n1 mb-0">Breakfast</h6>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 pb-3"
                  data-bs-toggle="pill"
                  href="#tab-2"
                >
                  <i className="fa fa-hamburger fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Special</small>
                    <h6 className="mt-n1 mb-0">Lunch</h6>
                  </div>
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="d-flex align-items-center text-start mx-3 me-0 pb-3"
                  data-bs-toggle="pill"
                  href="#tab-3"
                >
                  <i className="fa fa-utensils fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Lovely</small>
                    <h6 className="mt-n1 mb-0">Dinner</h6>
                  </div>
                </a>
              </li>
            </ul>
            <div className="tab-content">
              {foodMenu.map((category, index) => (
                <div
                  id={`tab-${index + 1}`}
                  className={`tab-pane fade show p-0 ${
                    index === 0 ? "active" : ""
                  }`}
                  key={index}
                >
                  <div className="row g-4">
                    {category.items.map((item, itemIndex) => (
                      <div className="col-lg-6" key={itemIndex}>
                        <div className="d-flex align-items-center">
                          <img
                            className="flex-shrink-0 img-fluid rounded"
                            src={item.img}
                            alt={item.name}
                            style={{ width: "80px" }}
                          />
                          <div className="w-100 d-flex flex-column text-start ps-4">
                            <h5 className="d-flex justify-content-between border-bottom pb-2">
                              <span>{item.name}</span>
                              <span className="text-primary">
                                &#8377;{item.price}
                              </span>
                            </h5>
                            <small className="fst-italic">{item.message}</small>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <button
                            className="btn btn-warning"
                            onClick={() => addToCart(item)}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className={`btn btn-outline-warning position-absolute end-0 top-0 position-relative res-mt--`}
              data-bs-toggle="modal"
              data-bs-target="#bookingModal"
            >
              <i className="bi bi-cart"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="modal fade" id="bookingModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Cart</h3>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`${emtyDnone}`}
              />
              <div className={`${emtyDnone}`}>
                <label htmlFor="tableSelect">Select a Table:</label>
                <select
                  id="tableSelect"
                  value={selectedTable}
                  onChange={handleTableChange}
                  className="form-select"
                >
                  <option value="" disabled>
                    Select a table
                  </option>
                  {table.map((tableNum) => (
                    <option key={tableNum} value={tableNum}>
                      Table {tableNum}
                    </option>
                  ))}
                </select>

                {selectedTable && <p>Selected Table: {selectedTable}</p>}
              </div>
              <div className="mt-5">
                {cart.length === 0 ? (
                  <p>No items in the cart yet.</p>
                ) : (
                  <ul>
                    {cart.map((cartItem, cartIndex) => (
                      <li key={cartIndex}>
                        {cartItem.name} - &#8377;{cartItem.price}
                        <button
                          className="btn btn-danger btn-sm ms-2"
                          onClick={() => removeFromCart(cartIndex)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="mt-3">
                <strong>Total: &#8377;{calculateTotal()}</strong>
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
                onClick={placeOrder}
                disabled={cart.length === 0 || !selectedTable}
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
