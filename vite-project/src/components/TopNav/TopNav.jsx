import React, { useContext, useEffect, useState } from 'react';
import './TopNav.css';
import { GiHamburgerMenu } from "react-icons/gi";
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { storeContext } from '../../context/StoreContext';

const TopNav = ({ toggleSidebar, setSearchQuery }) => {
    const [showNav, setShowNav] = useState(false);
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
        navigate('/')
    }

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
                    <input
                        className="search-input"
                        placeholder="Search"
                        type="search"
                        value={localSearchQuery} // Bind value to searchQuery state
                        onChange={handleSearch} // Update searchQuery on input change
                    />
                </div>

                <Link to="/cart"><img src={assets.basket_icon} className='cart' /></Link>
                <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>

                {!token ? <button className='profile-button'>Sign In</button> :
                    <div className='topnav-profile'>
                        <div className="sub-menu-wrap">
                            <div className="sub-menu">
                                <ul>
                                    <li onClick={() => navigate('/orderhistory')} className='sub-menu-link' >
                                        <p>Orders</p>
                                    </li>
                                    <li onClick={logout} className='sub-menu-link'>
                                        <p>Logout</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default TopNav;
