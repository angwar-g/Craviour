import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import { useState } from 'react';
import LoginPopup from './components/LoginPopup/LoginPopup';
import TopNav from './components/TopNav/TopNav';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import Footer from './components/Footer/Footer';  

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin = {setShowLogin}/> : null}
      <TopNav setShowLogin={setShowLogin} toggleSidebar={toggleSidebar} />
      <div className={isSidebarOpen ? 'App shift-content' : 'App'}>
        <Routes>
          <Route path='/' element={<Home toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/orderhistory' element={<OrderHistory />} />
        </Routes>
        <Footer/>
      </div>
    </>
  );
}

export default App;
