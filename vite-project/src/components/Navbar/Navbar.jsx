import React, { useState, useEffect } from 'react';
import { FaHome, FaShoppingCart, FaHistory } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ show, email: propEmail }) => {
  const [menu, setMenu] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if propEmail is provided, otherwise retrieve email from local storage
    if (propEmail) {
      setEmail(propEmail);
    } else {
      const savedEmail = localStorage.getItem('email');
      if (savedEmail) {
        setEmail(savedEmail);
      }
    }
  }, [propEmail]); // Depend on propEmail

  return (
    <div className={show ? 'sidenav active' : 'sidenav'}>
      <img src={assets.logo} alt='Craviour Logo' className='logo' />
      <ul>
        <li onClick={() => setMenu("home")} className={menu === "home" ? "clicked" : ""}>
          <a href="/"><FaHome />Home</a>
        </li>
        <li onClick={() => setMenu("cart")} className={menu === "cart" ? "clicked" : ""}>
          <a href="/cart"><FaShoppingCart />Cart</a>
        </li>
        <li onClick={() => setMenu("history")} className={menu === "orders" ? "clicked" : ""}>
          <a href="/orderhistory"><FaHistory />Orders</a>
        </li>
        <li onClick={() => setMenu("about")} className={menu === "about" ? "clicked" : ""}>
          <a href="#footer"><IoPersonSharp />About Us</a>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
