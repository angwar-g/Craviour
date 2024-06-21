import React, { useState } from 'react'
import './Header.css'

const Header = () => {
  // const [isSidebarOpen, setSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setSidebarOpen(!isSidebarOpen);
  // };

  return (
    <>
    {/* <TopNav toggleSidebar={toggleSidebar}/> */}
    <div className= 'header'>
        <div className='header-contents'>
            <h2>Order your favourite food here!</h2>
            <p>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.</p>
            <a href="#explore-menu"><button>View Menu</button></a>
        </div>
    </div>
    </>
    
  )
}

export default Header