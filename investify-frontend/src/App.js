import Homepage from "./Views/Homepage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Investland from "./Views/Investland";
import ShareView from "./Views/ShareView";
import Investments from "./Views/Investments";
import OrderHistory from "./Views/OrdersMain.jsx";
import Watchlist from "./Views/Watchlist.jsx";
import Alerts from "./Views/Alerts.jsx";


function App(){
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Homepage/>}/>
          <Route exact path='/invest/equity' element={<Investland/>}/>
          <Route exact path='/invest/equity/:shareName' element={<ShareView/>}/>
          <Route exact path='/invest/user/investments' element={<Investments/>}/>
          <Route exact path='/invest/user/orders' element={<OrderHistory/>}/>
          <Route exact path='/invest/user/watchlist' element={<Watchlist/>}/>
          <Route exact path='/invest/user/alerts' element={<Alerts/>}/>
          
      </Routes>
    </Router>
  );
}

export default App;