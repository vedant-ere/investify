import React from 'react';
import { FaCircle } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";


const SubOrder = () => {
  return (
    <div className="orderhistory-suborder-container">
      <div className="orderhistory-suborder-grid">
        <div>
          <div className="orderhistory-suborder-title">EaseMyTrip</div>
          <div className="orderhistory-suborder-details">
            Buy {"\u00B7"} Market {"\u00B7"} Regular
          </div>
        </div>
        <div>
          <div className="orderhistory-suborder-qty">10</div>
          <div className="orderhistory-suborder-label">Qty</div>
        </div>
        <div>
          <div className="orderhistory-suborder-price">41.33</div>
          <div className="orderhistory-suborder-label">Avg Price</div>
        </div>
        <div className="orderhistory-suborder-time">
          <span>9:32</span> {" "} <span><FaCircle /></span>{"  "} <span><FaAngleRight /></span>
        </div>
      </div>
    </div>
  );
};

export default SubOrder;
