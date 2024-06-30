import React, { useContext, useState } from 'react';
import './TopNav.css';
import Navbar from '../Navbar/Navbar';
import { GiHamburgerMenu } from "react-icons/gi";
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/StoreContext';

const TopNav = (props) => {
    const [showNav, setShowNav] = useState(false);

    const{getTotalCartAmount, token, setToken} = useContext(storeContext)

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token")
        setToken("")
        navigate('/')
    }

    console.log('TopNav props:', props);

    return (
        <div>
            <div className='topnav'>
                <GiHamburgerMenu 
                    className='hamburger' 
                    onClick={() => {
                        setShowNav(!showNav); 
                        props.toggleSidebar();
                    }} 
                />
                <Link to="/"><div className='title'>Craviour.</div></Link>
                <div className="search">
                    <img className="search-icon" src={assets.search_icon} alt="search icon" />
                    <input className="search-input" placeholder="Search" type="search" />
                </div>  
                
                <Link to="/cart"><img src= {assets.basket_icon} className='cart'/></Link>
                <div className={getTotalCartAmount()===0 ? "": "dot"}></div>

                {!token? <button onClick={() => props.setShowLogin(true)} className='profile-button'>Sign In</button> : 
                <div className='topnav-profile'> 
                    <img src={assets.profile_icon} />
                    <ul className="nav-profile-dropdown">
                        <li>
                            <img src={assets.bag_icon}></img>
                            <p>Orders</p>
                        </li>
                        <hr />
                        <li onClick={logout}>
                            <img src={assets.profile_icon}></img>
                            <p>Logout</p>
                        </li>
                        </ul>
                </div> }
                
            </div>
            {<Navbar show={showNav} />}
        </div>
    );
}

export default TopNav;
