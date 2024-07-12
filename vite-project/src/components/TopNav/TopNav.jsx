import React, { useContext, useEffect, useState } from 'react';
import './TopNav.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/StoreContext';
import Navbar from '../Navbar/Navbar';

const TopNav = ({ toggleSidebar, setSearchQuery, setShowLogin }) => {
    const [showNav, setShowNav] = useState(false);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [localSearchQuery, setLocalSearchQuery] = useState(''); // State for search query
    const { getTotalCartAmount, token, setToken, food_list } = useContext(storeContext);
    const navigate = useNavigate();

    useEffect(() => {
        setSearchQuery(localSearchQuery); // Update parent state when local state changes
    }, [localSearchQuery, setSearchQuery]);

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("name")
        localStorage.removeItem("email")
        setToken("")
        setEmail("")
        setName("")
        navigate('/')
    }

    useEffect(() => {
        // retrieve email from local storage when component mounts
        const savedEmail = localStorage.getItem('email');
        const savedName = localStorage.getItem('name');
        if (savedEmail) {
          setEmail(savedEmail);
        }
        if (savedName) {
            setName(savedName);
        }
      }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase().trim();
        setLocalSearchQuery(query);

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
                    <img className="search-icon" src={assets.search_icon} alt="search icon" />
                    <input onClick={(e) => {window.location.href = '/#food-display'}}
                        className="search-input"
                        placeholder="Search"
                        type="search"
                        value={localSearchQuery} // Bind value to searchQuery state
                        onChange={handleSearch} // Update searchQuery on input change
                    />
                </div>

                <Link to="/cart"><img src={assets.basket_icon} className='cart' /></Link>
                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>

                {!token? <button onClick={() => setShowLogin(true)} className='profile-button'>Sign In</button> : 
                <div className='topnav-profile'> 
                    <img src={assets.profile_image}/>
                    <div className="sub-menu-wrap">
                        <div className="sub-menu">
                            <div className="user-info">
                            <img src={assets.profile_image}></img>
                            <h2>{name}</h2>
                            </div>
                            <hr></hr>
                            <ul>
                            <li onClick={() => navigate('/orderhistory')} class='sub-menu-link' >
                                <img src={assets.bag_icon}></img>
                                <p>Orders</p>
                                <span>&gt;</span>
                            </li>
                            <li onClick={logout} class='sub-menu-link'>
                                <img src={assets.logout_icon}></img>
                                <p>Logout</p>
                                <span>&gt;</span>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div> 
                }
            </div>
            {<Navbar show={showNav} />}
        </div>
    );
}

export default TopNav;
