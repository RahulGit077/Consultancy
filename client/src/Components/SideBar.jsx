import React from "react";
import "../Styles/SideBar.css";

const SideBar = () => {
  return (
    <div className="SideBar d-flex flex-column">
      <div className="bar-head d-flex justify-content-center align-items-center">
        <h4>ERP SYSTEM</h4>
      </div>
      <div className="bar-items d-flex flex-column">
        <div
          className="item d-flex align-items-center justify-content-center"
          onClick={() => (window.location.href = "/")}
        >
          {/* <i className="fa-solid fa-house"></i> */}
          <span>Dashboard</span>
        </div>
        <div
          className="item d-flex align-items-center justify-content-center"
          onClick={() => (window.location.href = "/configuration")}
        >
          {/* <i className="fa-solid fa-gear"></i> */}
          <span>Configuration</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
