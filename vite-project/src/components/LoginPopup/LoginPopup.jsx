import React, { useState, useEffect, useContext } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { storeContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopup = ({ setShowLogin, setEmail }) => { // Added setEmail prop

    const {url, setToken} = useContext(storeContext);
    const [currState, setCurrState] = useState("Login");
    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onchangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data =>({...data, [name]: value}));
    };

    const onLogin = async (event) => {
        event.preventDefault();
        let newUrl = url;
        if(currState === "Login") {
            newUrl += '/api/user/login';
        }
        else {
            newUrl += '/api/user/register';
        }

        const response = await axios.post(newUrl, data);
        if (response.data.success) {
            setToken(response.data.token);
            localStorage.setItem("token", response.data.token);
            setEmail(data.email); // Set the email state in the parent component
            localStorage.setItem("email", data.email)
            setShowLogin(false);
        }
        else {
            alert(response.data.message);
        }
    };

    useEffect(() => {
        // Disable scrolling when the component mounts
        document.body.style.overflow = 'hidden';
        document.body.classList.add('no-click');

        // Enable scrolling when the component unmounts
        return () => {
            document.body.style.overflow = 'auto';
            document.body.classList.remove('no-click');
        };
    }, []);

    // Effect to clear form data when switching between Login and Sign Up
    useEffect(() => {
        setData({
            name: "",
            email: "",
            password: ""
        });
    }, [currState]);

    return (
        <div className='login-popup'>
            <form onSubmit={onLogin} action="" className="login-popup-container">
                <div className='login-popup-title'>
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
                </div>
                <div className="login-popup-inputs">
                    {currState === "Login" ? <></> : <input name= 'name' onChange={onchangeHandler} value={data.name} type='text' placeholder='Name' required></input>}
                    <input name='email' onChange={onchangeHandler} value={data.email} type='email' placeholder='Email' required></input>
                    <input name='password' onChange={onchangeHandler} value={data.password} type='password' placeholder='Password' required></input>
                </div>
                <button type='submit'>{currState === "Sign Up" ? "Create Account" : "Login"}</button>
                <div className="login-popup-condition">
                    <input type="checkbox" required />
                    <p>By continuing, I agree to the Terms of Use and Privacy Policy.</p>
                </div>
                {currState === "Login" ? (
                    <p>
                        Create a new account?
                        <span onClick={() => setCurrState("Sign Up")}> Click here!</span>
                    </p>
                ) : (
                    <p>
                        Already have an account?
                        <span onClick={() => setCurrState("Login")}> Login here</span>
                    </p>
                )}
            </form>
        </div>
    );
};

export default LoginPopup;
