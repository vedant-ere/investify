import React from "react";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import AlertCard from "../Components/AlertCard";

const Alerts = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Topbar />
      <AlertCard></AlertCard>
    </div>
  );
};

export default Alerts;
