import React from 'react';

const AlertCard = () => {
  return (
    <div className="alert-card-container">
      <div className="alert-card">
        <div className="alert-card-grid">
          <div className="alert-card-details-section">
            <div className="alert-card-title">EaseMyTrip</div>
            <div className="alert-card-details">
              Buy &middot; Market &middot; Regular
            </div>
          </div>
          <div className="alert-card-qty-section">
            <div className="alert-card-qty">Pending</div>
            <div className="alert-card-label">Status</div>
          </div>
          <div className="alert-card-price-section">
            <div className="alert-card-price">41.33</div>
            <div className="alert-card-label">Alert Price</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertCard;
