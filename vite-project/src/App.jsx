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
import Verify from './pages/Verify/Verify';
import './index.css';
import './components/Footer/Footer.css';

function App () {
  const [showLogin, setShowLogin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
      <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin} setEmail={setEmail} setName={setName}/> : null}
      <TopNav setShowLogin={setShowLogin} toggleSidebar={toggleSidebar} email={email} name={name} />
      <Navbar show={isSidebarOpen} email={email} /> 
      <div className={isSidebarOpen ? 'App shift-content' : 'App'}>
        <Routes>
          <Route path='/' element={<Home toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orderhistory' element={<OrderHistory />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
        </Routes>
      </div>
      <Footer toggleSidebar={toggleSidebar} />
    </>
      </div>
    </div>
  );
}

export default App;
  
