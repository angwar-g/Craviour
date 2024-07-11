import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="sidebar-options">
            <NavLink to='/add' className="sidebar-option">
                <img src={assets.add_icon}/>
                <p>Add Items</p>
            </NavLink>
            <NavLink to='/list' className="sidebar-option">
                <img src={assets.order_icon}/>
                <p>List Items</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img src={assets.order_icon}/>
                <p>Orders</p>
            </NavLink>
            <NavLink to='http://localhost:5173' className="sidebar-option">
                <img src={assets.logout_icon} className='logout-icon'/>
                <p>Logout</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar