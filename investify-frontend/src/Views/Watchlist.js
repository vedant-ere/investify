import React from "react";
import Topbar from "../Components/Topbar";
import Navbar from "../Components/Navbar";
import WatchlistComponent from "../Components/WatchlistComponent";
const Watchlist = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Topbar></Topbar>
      <div className="watchlist-outer-container">
        <WatchlistComponent></WatchlistComponent>
      </div>
    </div>
  );
};

export default Watchlist;
