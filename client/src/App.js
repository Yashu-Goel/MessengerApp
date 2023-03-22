import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Signup from './authentication/Signup/Signup';
import Login from './authentication/Login';


function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
