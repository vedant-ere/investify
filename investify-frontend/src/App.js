import Homepage from "./Views/Homepage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App(){
  return (
    <Router>
      <Routes>
          <Route exact path="/" element={<Homepage/>}/>
      </Routes>
    </Router>
  );
}

export default App;