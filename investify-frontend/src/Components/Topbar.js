import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState('');

  useEffect(() => {
    // Extract the last part of the URL to sync active state
    const path = location.pathname.split('/').pop();
    setActive(path);
  }, [location]);

  const handleNavigation = (page) => {
    setActive(page);
    navigate(`/invest/user/${page}`);
  };

  return (
    <div>
      <div className="topbar">
        <button
          className={`topbar-btn ${active === 'orders' ? 'active' : ''}`}
          onClick={() => handleNavigation('orders')}
        >
          Orders
        </button>
        <button
          className={`topbar-btn ${active === 'investments' ? 'active' : ''}`}
          onClick={() => handleNavigation('investments')}
        >
          Investments
        </button>
        <button
          className={`topbar-btn ${active === 'alerts' ? 'active' : ''}`}
          onClick={() => handleNavigation('alerts')}
        >
          Alerts
        </button>
        <button
          className={`topbar-btn ${active === 'watchlist' ? 'active' : ''}`}
          onClick={() => handleNavigation('watchlist')}
        >
          Watchlist
        </button>
      </div>
    </div>
  );
};

export default Topbar;
