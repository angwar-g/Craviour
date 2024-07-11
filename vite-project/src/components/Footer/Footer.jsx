import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = ({ isSidebarOpen }) => {
  return (
    <footer className={`footer ${isSidebarOpen ? 'footer-sidebar-open' : ''}`} id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <img className="logo-image" src={assets.logo}></img>
                <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies. All trademarks are properties of their respective owners.</p>
                <div className="footer-social-icons">
                    <img src={assets.facebook_icon}></img>
                    <img src={assets.linkedin_icon}></img>
                    <img src={assets.twitter_icon}></img>
                </div>
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>080 4575 3837</li>
                    <li>contact@craviour.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copyright">
        2023-2024 © Craviour™ Ltd. All rights reserved.
            </p>
        
    </footer>
  )
}

export default Footer
