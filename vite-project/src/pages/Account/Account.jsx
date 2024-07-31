import React, { useState, useEffect, useContext } from 'react';
import './Account.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { storeContext } from '../../context/StoreContext';

const Account = () => {
    const { url } = useContext(storeContext);
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: localStorage.getItem('name') || '',
        email: localStorage.getItem('email') || ''
    });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        if (image) {
            formData.append('profileImage', image);
        }

        try {
            const response = await axios.put(url+'/api/user/updateProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const { name, email, profileImage } = response.data.user;
            localStorage.setItem('name', name);
            localStorage.setItem('email', email);
            if (profileImage) {
                localStorage.setItem('profileImage', profileImage);
            }
            alert('Profile updated successfully');
            window.location.reload() // refresh the page
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Failed to update profile');
        }
    };

    useEffect(() => {
        const storedImage = localStorage.getItem('profileImage');
        if (storedImage) {
            setImage(storedImage);
        }
    }, []);

    return (
        <div className='account'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='account-image-upload-flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                    <img src={image ? (image instanceof File ? URL.createObjectURL(image) : `${url}/images/${image}`) : assets.upload_area} alt="Upload" />
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type='file' id='image' />
                </div>
                <div className='account-name flex-col'>
                    <p>Name</p>
                    <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Enter Name here' required />
                </div>
                <div className='account-name flex-col'>
                    <p>Email</p>
                    <input onChange={onChangeHandler} value={data.email} type='email' name='email' placeholder='Enter Email here' required />
                </div>
                <button type='submit'>Update Profile</button>
            </form>
        </div>
    );
};

export default Account;
