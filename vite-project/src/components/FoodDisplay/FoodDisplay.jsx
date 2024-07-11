import React, { useContext } from 'react';
import "./FoodDisplay.css";
import { storeContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category, searchQuery }) => {
    const { food_list } = useContext(storeContext);

    if (!food_list || food_list.length === 0) {
        return <div>Loading...</div>; // Handle loading state
    }

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list
                    .filter((item) => {
                        if (!searchQuery || searchQuery.trim() === '') {
                            return true;
                        }
                        return item.name.toLowerCase().includes(searchQuery.toLowerCase());
                    })
                    .filter((item) => category === "All" || item.category === category)
                    .map((item, index) => (
                        <FoodItem
                            key={index}
                            id={item._id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                        />
                    ))}
            </div>
        </div>
    );
};

export default FoodDisplay;
