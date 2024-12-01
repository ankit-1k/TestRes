import React, { useState, useEffect } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { useNavigate, useLocation } from "react-router-dom";
import "./header.css";

const AdHeader = () => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(""); // State to track the selected menu item
  const navigate = useNavigate();
  const location = useLocation();

  // Get the selected item from localStorage on initial render
  useEffect(() => {
    const storedSelectedItem = localStorage.getItem("selectedItem");
    if (storedSelectedItem) {
      setSelectedItem(storedSelectedItem);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/adminlogin");
  };

  const handleMenuClick = (item, path) => {
    setSelectedItem(item); // Set the clicked menu item as active
    localStorage.setItem("selectedItem", item); // Store it in localStorage
    navigate(path); // Navigate to the corresponding path
  };

  // Set selectedItem based on current route for when the component re-renders
  useEffect(() => {
    const pathToItemMap = {
      "/admin": "admin",
      "/adminmenu": "menu",
      "/admintable": "table",
      "/reports": "reports",
      "/weekreports": "menuReports",
      "/admincontact": "admincontact",
    };
    const item = pathToItemMap[location.pathname];
    if (item) {
      setSelectedItem(item);
    }
  }, [location.pathname]);

  return (
    <div>
      {/* Top Bar */}
      <div className="ad-header">
        <h3 className="text-primary m-0 text-white">
          <i className="fa fa-utensils ad-title me-2"></i>TasteOn
        </h3>
        <Button
          icon="pi pi-bars"
          className="bg-white text-dark border-0"
          onClick={() => setVisible(true)}
        />
      </div>

      {/* Sidebar */}
      <Sidebar
        visible={visible}
        onHide={() => setVisible(false)}
        className="ad-sidebar"
      >
        <h2 className="ad-sidebar-title">
          <i className="fa fa-utensils ad-title me-2"></i>TasteOn
        </h2>
        <ul className="ad-menu">
          <li
            className={`ad-menu-item ${selectedItem === "admin" ? "selected" : ""}`}
            onClick={() => handleMenuClick("admin", "/admin")}
          >
            Dashboard
          </li>
          <li
            className={`ad-menu-item ${selectedItem === "menu" ? "selected" : ""}`}
            onClick={() => handleMenuClick("menu", "/adminmenu")}
          >
            Menu
          </li>
          <li
            className={`ad-menu-item ${selectedItem === "table" ? "selected" : ""}`}
            onClick={() => handleMenuClick("table", "/admintable")}
          >
            Table Book
          </li>
          <li
            className={`ad-menu-item ${selectedItem === "reports" ? "selected" : ""}`}
            onClick={() => handleMenuClick("reports", "/reports")}
          >
            Reports
          </li>
          <li
            className={`ad-menu-item ${selectedItem === "menuReports" ? "selected" : ""}`}
            onClick={() => handleMenuClick("menuReports", "/weekreports")}
          >
            Menu Reports
          </li>
          <li
            className={`ad-menu-item ${selectedItem === "admincontact" ? "selected" : ""}`}
            onClick={() => handleMenuClick("admincontact", "/admincontact")}
          >
            Contact
          </li>
          <button className="ad-button mt-2" onClick={handleLogout}>
            Logout
          </button>
        </ul>
      </Sidebar>
    </div>
  );
};

export default AdHeader;


// import React, { useState } from "react";
// import { Sidebar } from "primereact/sidebar";
// import { Button } from "primereact/button";
// import "./header.css";
// import { useNavigate } from "react-router-dom";

// const AdHeader = () => {
//   const [visible, setVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("adminLoggedIn");
//     navigate("/adminlogin");
//   };
//   return (
//     <div>
//       {/* Top Bar */}
//       <div className="ad-header">
//         {/* <h1 className="ad-title text-white">TestOn Admin</h1> */}
//         <h3 class="text-primary m-0 text-white">
//           <i class="fa fa-utensils ad-title me-2"></i>TasteOn
//         </h3>
//         <Button
//           icon="pi pi-bars"
//           className="bg-white text-dark border-0"
//           onClick={() => setVisible(true)}
//         />
//       </div>

//       {/* Sidebar */}
//       <Sidebar
//         visible={visible}
//         onHide={() => setVisible(false)}
//         className="ad-sidebar"
//       >
//         <h2 className="ad-sidebar-title">
//           <i class="fa fa-utensils ad-title me-2"></i>TasteOn
//         </h2>
//         <ul className="ad-menu">
//           <li className="ad-menu-item">Dashboard</li>
//           <li className="ad-menu-item" onClick={() => navigate("/adminmenu")}>
//             Menu
//           </li>
//           <li className="ad-menu-item" onClick={() => navigate("/admintable")}>
//             Table Book
//           </li>
//           <li className="ad-menu-item" onClick={() => navigate("/reports")}>
//             Reports
//           </li>
//           <li className="ad-menu-item" onClick={() => navigate("/weekreports")}>Menu Reports</li>
//           <button className="ad-button mt-2" onClick={handleLogout}>
//             Logout
//           </button>
//         </ul>
//       </Sidebar>
//     </div>
//   );
// };

// export default AdHeader;
