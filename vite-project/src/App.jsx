import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import LoginPopup from './components/LoginPopup/LoginPopup';
import TopNav from './components/TopNav/TopNav';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import Footer from './components/Footer/Footer';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState(""); // Initialize with an empty string

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} setEmail={setEmail} /> : null}
      <TopNav setShowLogin={setShowLogin} toggleSidebar={toggleSidebar} />
      <Navbar show={isSidebarOpen} email={email} /> {/* Pass email as prop */}
      <div className={isSidebarOpen ? 'App shift-content' : 'App'}>
        <Routes>
          <Route path='/' element={<Home toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orderhistory' element={<OrderHistory />} />
          <Route path='/order' element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer toggleSidebar={toggleSidebar} />
    </>
  );
}

export default App;
