import React, { useState } from "react";
import "../App.css"; // CSS file ka path check kar lena


const Funds = () => {
  const [balance, setBalance] = useState(0.0);
  const [usedBalance, setUsedBalance] = useState(0.0);
  const [amount, setAmount] = useState("");

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const addMoney = (value) => {
    setAmount((prev) => (prev ? parseFloat(prev) + value : value));
  };

  return (
    <div className="funds-container">
  <div className="primary-grid" style={{ gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
    {/* Left Section */}
    <div className="funds-section">
      <h2>For Stocks, F&O</h2>
      <p className="text-enlarge font-bold">₹{balance.toFixed(2)}</p>
      <p>Used balance</p>
      <p className="font-bold">₹{usedBalance.toFixed(2)}</p>
      <button className="no-deco pointer">All transactions</button>
    </div>

    {/* Right Section */}
    <div className="funds-section">
      <div className="primary-flex gap">
        <button className="funds-button">Add money</button>
        <button className="bg-remove pointer mar-left">Withdraw</button>
      </div>
      <div>
        <label>Enter Amount</label>
        <input
          type="text"
          className="funds-input mar-top-sml mar-bottom"
          placeholder="₹ 0"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div className="primary-flex gap">
        <button className="funds-add-button" onClick={() => addMoney(100)}>
          + ₹100
        </button>
        <button className="funds-add-button mar-left" onClick={() => addMoney(500)}>
          + ₹500
        </button>
      </div>
      <div className="border-round padding-small">
        <p>vedantere370@okhdfcbank</p>
        <p className="wheaten">BOB ---1827</p>
      </div>
      <button className="funds-button">Add money</button>
    </div>
  </div>

  {/* Bottom Section */}
  <div className="funds-section mar-top">
    <h3>Get extra margin for trading</h3>
    <p className="wheaten">Zero Cost Pledging</p>
  </div>
</div>

  );
};

export default Funds;
