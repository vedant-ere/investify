import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HeldShares() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    async function getAllInvestments() {
      try {
        let response = await axios.get("http://localhost:5000/api/user/allInvestments");
        setInvestments(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getAllInvestments();
  }, []);

  return (
    <div style={{   height: "fit-content",   padding: "20px",   display: "flex",   justifyContent: "center", }}>
      <div style={{   width: "100%",   maxWidth: "960px",   boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",   borderRadius: "8px",   padding: "24px",   marginLeft: "0px", }}>
        <h1 style={{   fontSize: "24px",   fontWeight: "600",   color: "#D1D5DB",   marginBottom: "24px", }}>Holdings ({investments.length})</h1>
        {investments.length > 0 ? (
          investments.map((item, index) => (
            <div key={index} style={{   display: "grid",   justifyContent: "space-between",   alignItems: "center",   borderBottom: "1px solid #4B5563",   padding: "16px 0", }}>
              <div style={{   fontSize: "24px",   fontWeight: "600",   paddingBottom: "8px",   color: "#FFFFFF", }}>{item.shareName}</div>
              <div style={{   fontSize: "14px",   fontFamily: "Arial, sans-serif",   paddingLeft: "8px",   color: "#9CA3AF", }}>Total Value:{" "}
                <span style={{   fontWeight: "",   color: "#E5E7EB", }}>{item.totalValue}</span>
              </div>
              <span style={{   fontSize: "14px",   fontFamily: "Arial, sans-serif",   paddingLeft: "8px",   color: "#9CA3AF", }}>Avg Price:{" "}
                <span style={{   fontWeight: "",   color: "#E5E7EB", }}>{item.avgPrice}</span>
              </span>
            </div>
          ))
        ) : (
          <div style={{   textAlign: "center",   color: "#6B7280", }}>No investments found.</div>
        )}
      </div>
    </div>
  );
}
