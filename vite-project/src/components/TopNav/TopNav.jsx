import React, { useContext, useState } from 'react';
import './TopNav.css';
import Navbar from '../Navbar/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdContact } from "react-icons/io";
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';
import { storeContext } from '../../context/StoreContext';

const TopNav = (props) => {
    const [showNav, setShowNav] = useState(false);

    const{getTotalCartAmount} = useContext(storeContext)

    console.log('TopNav props:', props);

    return (
        <div>
            <div className='topnav'>
                <GiHamburgerMenu 
                    className='hamburger' 
                    onClick={() => {
                        setShowNav(!showNav); 
                        props.toggleSidebar(); // Ensure this is defined
                    }} 
                />
                <Link to="/"><div className='title'>Craviour.</div></Link>
                <div className="search">
                    <img className="search-icon" src={assets.search_icon} alt="search icon" />
                    <input className="search-input" placeholder="Search" type="search" />
                </div>  
                <Link to="/cart"><div className='cart'><FaShoppingCart />
                    <div className={getTotalCartAmount()===0 ? "": "dot"}></div>
                </div></Link>
                <IoMdContact onClick={() => props.setShowLogin(true)} className='profile' />
            </div>
            {<Navbar show={showNav} />}
        </div>
    );
}

export default TopNav;
