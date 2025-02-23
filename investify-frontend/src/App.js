import Homepage from "./Views/Homepage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Investland from "./Views/Investland";
import ShareView from "./Views/ShareView";
import Investments from "./Views/Investments";

function App(){
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Homepage/>}/>
          <Route exact path='/invest/equity' element={<Investland/>}/>
          <Route exact path='/invest/equity/:shareName' element={<ShareView/>}/>
          <Route exact path='/invest/user/investments' element={<Investments/>}/>
      </Routes>
    </Router>
  );
}

export default App;