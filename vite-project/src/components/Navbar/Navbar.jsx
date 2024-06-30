import React, { useState } from 'react';
import { FaHome, FaShoppingCart, FaHistory } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import './Navbar.css';
import { assets } from '../../assets/assets';

const Navbar = ({ show, email }) => {
  const [menu, setMenu] = useState("");

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
        <li onClick={() => setMenu("history")} className={menu === "history" ? "clicked" : ""}>
          <a href="/orderhistory"><FaHistory />Order History</a>
        </li>
        <li onClick={() => setMenu("about")} className={menu === "about" ? "clicked" : ""}>
          <a href="#footer"><IoPersonSharp />About Us</a>
        </li>
        {email && email.includes("admin") && (
          <li onClick={() => setMenu("admin")} className={menu === "admin" ? "clicked" : ""}>
            <a href="/admin"><IoPersonSharp />Admin Panel</a>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
