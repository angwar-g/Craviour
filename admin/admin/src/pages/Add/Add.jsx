import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

const Add = ({ url }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad'
    });

    useEffect(() => {
        if (location.state && location.state.item) {
            setData({
                name: location.state.item.name,
                description: location.state.item.description,
                price: location.state.item.price,
                category: location.state.item.category,
                _id: location.state.item._id,
            });
            setImage(location.state.item.image);
        }
    }, [location.state]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({ ...data, [name]: value }));
    };

    const clearForm = () => {
        setData({
            name: '',
            description: '',
            price: '',
            category: 'Salad'
        });
        setImage(null);
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        if (image instanceof File) {
            formData.append('image', image);
        }

        const endpoint = data._id ? `${url}/api/food/update` : `${url}/api/food/add`;
        const response = await axios.post(endpoint, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            params: {
                id: data._id
            }
        });

        if (response.data.success) {
            toast.success(response.data.message);
            clearForm();
        } else {
            toast.error('Error');
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-image-upload flex-col'>
                    <p>Upload Image</p>
                    <label htmlFor='image'>
                        <img src={image ? (image instanceof File ? URL.createObjectURL(image) : `${url}/images/${image}`) : assets.upload_area} alt="Upload" />
                    </label>
                    <input onChange={(e) => { setImage(e.target.files[0]); }} type='file' id='image' hidden={!image} />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Product Name</p>
                    <input onChange={onChangeHandler} value={data.name} type='text' name='name' placeholder='Type here' required />
                </div>
                <div className='add-product-desc flex-col'>
                    <p>Product Description</p>
                    <textarea onChange={onChangeHandler} value={data.description} name='description' rows='6' placeholder='Write content here' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Product Category</p>
                        <select onChange={onChangeHandler} name='category' value={data.category}>
                            <option value='Salad'>Salad</option>
                            <option value='Rolls'>Rolls</option>
                            <option value='Desserts'>Desserts</option>
                            <option value='Sandwich'>Sandwich</option>
                            <option value='Cake'>Cake</option>
                            <option value='Pure Veg'>Pure Veg</option>
                            <option value='Pasta'>Pasta</option>
                            <option value='Noodles'>Noodles</option>
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Product Price</p>
                        <input onChange={onChangeHandler} value={data.price} type='number' name='price' placeholder='₹200' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>
                    {data._id ? 'Update' : 'Add'}
                </button>
            </form>
        </div>
    );
};

export default Add;
