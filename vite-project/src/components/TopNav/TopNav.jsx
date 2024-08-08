import React, { useContext, useEffect, useState } from 'react';
import './TopNav.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/StoreContext';
import Navbar from '../Navbar/Navbar';

const TopNav = ({ toggleSidebar, setSearchQuery, setShowLogin }) => {
    const [showNav, setShowNav] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState("")
    const [localSearchQuery, setLocalSearchQuery] = useState(''); 
    const { url, getTotalCartAmount, token, setToken} = useContext(storeContext);
    const navigate = useNavigate();

    useEffect(() => {
        setSearchQuery(localSearchQuery); 
    }, [localSearchQuery, setSearchQuery]);

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        localStorage.removeItem("profileImage")
        setToken("")
        setEmail("")
        setName("")
        setProfileImage("")
        navigate('/')
    }

    useEffect(() => {
        // retrieve email from local storage when component mounts
        const savedEmail = localStorage.getItem('email');
        const savedName = localStorage.getItem('name');
        const savedProfileImage = localStorage.getItem('profileImage');
        if (savedEmail) {
          setEmail(savedEmail);
        }
        if (savedName) {
            setName(savedName);
        }
        if (savedProfileImage) setProfileImage(savedProfileImage);
        console.log("Profile Image", savedProfileImage)
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase().trim();
        setLocalSearchQuery(query);
    };

    const handleSearchIconClick = () => {
        setShowSearch(true);
        document.getElementById('food-display')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            <div className='topnav'>
                <GiHamburgerMenu
                    className='hamburger'
                    onClick={() => {
                        setShowNav(!showNav);
                        toggleSidebar();
                    }}
                />
                <Link to="/"><div className='title'>Craviour.</div></Link>
                <div className="search">
                    <img
                        className="search-icon"
                        src={assets.search_icon}
                        alt="search icon"
                        onClick={handleSearchIconClick}
                    />
                    {showSearch && (
                        <input
                            className="search-input"
                            placeholder="Search"
                            type="search"
                            value={localSearchQuery} 
                            onChange={handleSearch} 
                            autoFocus
                        />
                    )}
                </div>

                <Link to="/cart"><img src={assets.basket_icon} className='cart' /></Link>
                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>

                {!token ? (
                    <button onClick={() => setShowLogin(true)} className='profile-button'>Sign In</button>
                ) : (
                    <div className='topnav-profile'>
                        <img src={profileImage ? `${url}/images/${profileImage}` : assets.profile_icon} alt="profile" />
                        <div className="sub-menu-wrap">
                            <div className="sub-menu">
                                <div className="user-info">
                                <img src={profileImage ? `${url}/images/${profileImage}` : assets.profile_icon} alt="profile" />
                                    <h2>{name}</h2>
                                </div>
                                <hr />
                                <ul>
                                <li onClick={() => navigate('/account')} className='sub-menu-link'>
                                        <img src={assets.profile_icon} alt="logout" />
                                        <p>My Account</p>
                                        <span>&gt;</span>
                                    </li>
                                    <li onClick={() => navigate('/orderhistory')} className='sub-menu-link'>
                                        <img src={assets.bag_icon} alt="orders" />
                                        <p>Orders</p>
                                        <span>&gt;</span>
                                    </li>
                                    <li onClick={logout} className='sub-menu-link'>
                                        <img src={assets.logout_icon} alt="logout" />
                                        <p>Logout</p>
                                        <span>&gt;</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {<Navbar show={showNav} />}
        </div>
    );
}

export default TopNav;
