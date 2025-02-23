import React, { useState } from "react";

import SubOrder from "./SubOrder";

const TimeCard = ({ orderData }) => {
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [avgPrice, setavgPrice] = useState("");
  const [time, settime] = useState("");
  const [status, setstatus] = useState("");

  return (
    <div className="orderhistory-card-container">
      <div className="orderhistory-card-wrapper">
        <div className="orderhistory-card-header">
          19 Sep 2024
          <div className="orderhistory-card-divider"></div>
        </div>
        <SubOrder />
      </div>
    </div>
  );
};

export default TimeCard;
