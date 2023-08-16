import './App.css';
import Navbar from "./components/Navbar";
import {Routes, Route } from 'react-router-dom';
import HomeScreen from "./screens/Homescreen";
import Bookingscreen from './screens/Bookingscreen';
import Loginscreen from './screens/Loginscreen';
import Registerscreen from './screens/Registerscreen';
import Profilescreen from './screens/Profilescreen';

function App() {
  return (
    <div className="App">
      <Navbar/> 
      <Routes>
        <Route path="/" element={<HomeScreen/>} />
        <Route path="/book/:roomid/:fromdate/:todate" element={<Bookingscreen/>} />
        <Route path="/login" element={<Loginscreen/>} />
        <Route path="/register" element={<Registerscreen/>} />
        <Route path="/profile" element={<Profilescreen/>} />
      </Routes>
    </div>
  );
}

export default App;
