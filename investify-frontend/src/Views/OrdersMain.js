import React from "react";
import TimeCard from "../Components/TimeCard";
import SubOrder from "../Components/SubOrder";
import Navbar from "../Components/Navbar";
import Topbar from "../Components/Topbar";
const OrderHistory = () => {
  return (
    <>
    <Navbar></Navbar>
    <Topbar></Topbar>
    <div className="orderhistory-container">
      {/* Left Section - Filters */}
      <div className="orderhistory-filters-section">
        <div className="orderhistory-filters-header">
          <div>Filters</div>
          <button className="orderhistory-clear-btn">Clear All</button>
        </div>
        <div className="orderhistory-search-container">
          <input
            type="text"
            placeholder="Search Stocks"
            className="orderhistory-search-input"
            
          />
        </div>
        <div className="orderhistory-checkbox-container">
          <div className="orderhistory-checkbox-item">
            <input type="checkbox" className="orderhistory-checkbox" />
            <span className="orderhistory-checkbox-label">Buy Orders</span>
          </div>
          <div className="orderhistory-checkbox-item">
            <input type="checkbox" className="orderhistory-checkbox" />
            <span className="orderhistory-checkbox-label">Sell Orders</span>
          </div>
        </div>
      </div>

      {/* Right Section - Order Cards */}
      <div className="orderhistory-list-section">
     <SubOrder></SubOrder>
      </div>
    </div>
    </>
  );
};

export default OrderHistory;
