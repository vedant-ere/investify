import React, { useState } from 'react';
import { MdDeleteForever } from "react-icons/md";

const WatchlistComponent = () => {
  
  const stockOptions = [
    { name: "Apple Inc.", price: 173.50 },
    { name: "Microsoft", price: 378.85 },
    { name: "Amazon", price: 174.42 },
    { name: "Google", price: 142.65 },
    { name: "Meta", price: 484.03 },
    { name: "Tesla", price: 193.57 },
    { name: "NVIDIA", price: 788.17 },
    { name: "Netflix", price: 586.15 }
  ];

  const [watchlists, setWatchlists] = useState([
    { name: "Default Watchlist", stocks: [{ name: "EaseMyTrip", price: 100 }] },
  ]);
  const [selectedWatchlistIndex, setSelectedWatchlistIndex] = useState(0);
  const [nextStockIndex, setNextStockIndex] = useState(0);

  // Add a new watchlist
  // const handleAddWatchlist = () => {
  //   const newName = prompt("Enter the name of the new watchlist:");
  //   if (newName && newName.trim() !== "") {
  //     setWatchlists([...watchlists, { name: newName, stocks: [] }]); 
  //   }
  // };

  // Delete a watchlist
  const handleDeleteWatchlist = (indexToDelete) => {
    if (watchlists.length === 1) {
      alert("Cannot delete the last watchlist!");
      return;
    }

    const updatedWatchlists = watchlists.filter((_, index) => index !== indexToDelete);
    setWatchlists(updatedWatchlists);
    
    // Adjust selected index if necessary
    if (indexToDelete <= selectedWatchlistIndex) {
      setSelectedWatchlistIndex(Math.max(0, selectedWatchlistIndex - 1));
    }
  };

  // Delete a stock from a watchlist
  const handleDeleteStock = (index) => {
    const updatedWatchlists = [...watchlists];
    updatedWatchlists[selectedWatchlistIndex].stocks.splice(index, 1);
    setWatchlists(updatedWatchlists);
  };

  // Add a stock to the current watchlist
  // const handleAddStock = () => {
  //   const updatedWatchlists = [...watchlists];
  //   const newStock = stockOptions[nextStockIndex];
    
  //   updatedWatchlists[selectedWatchlistIndex].stocks.push({
  //     name: newStock.name,
  //     price: newStock.price,
  //   });
    
  //   setWatchlists(updatedWatchlists);
  //   setNextStockIndex((nextStockIndex + 1) % stockOptions.length);
  // };

  return (
    <div className="watchlist-wrapper">
      <div className="watchlist-sidebar">
        <h3>Your Watchlists</h3>
        {watchlists.map((list, index) => (
          <div
            key={index}
            className={`watchlist-item ${
              selectedWatchlistIndex === index ? "active" : ""
            }`}
          >
            <div 
              className="watchlist-item-name"
              onClick={() => setSelectedWatchlistIndex(index)}
            >
              {list.name}
            </div>
            <div 
              className="watchlist-item-delete"
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteWatchlist(index);
              }}
            >
              <MdDeleteForever />
            </div>
          </div>
        ))}
        {/* <button className="watchlist-add-btn" onClick={handleAddWatchlist}>
          + Create New Watchlist
        </button> */}
      </div>

      <div className="watchlist-container">
        <h2>{watchlists[selectedWatchlistIndex].name}</h2>
        {/* <button className="watchlist-add-stock-btn" onClick={handleAddStock}>
          + Add Stock
        </button> */}

        {watchlists[selectedWatchlistIndex].stocks.length === 0 ? (
          <p className="empty-msg">No stocks added yet.</p>
        ) : (
          watchlists[selectedWatchlistIndex].stocks.map((stock, index) => (
            <div key={index} className="watchlist-grid">
              <div className="watchlist-stock-details">
                <div>
                  <div className="watchlist-stock-title">{stock.name}</div>
                  <div className="watchlist-stock-type">Market • Regular</div>
                </div>
              </div>

              <div className="watchlist-stock-price">
                <div className="watchlist-price-value">${stock.price.toFixed(2)}</div>
                <div className="watchlist-label">Current Price</div>
              </div>

              <div
                className="watchlist-stock-delete"
                onClick={() => handleDeleteStock(index)}
              >
                <MdDeleteForever />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WatchlistComponent;