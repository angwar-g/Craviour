import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const storeContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = 'http://localhost:4000';
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: (prev[itemId] || 0) + 1
        }));
        if (token) {
            await axios.post(url + '/api/cart/add', { itemId }, { headers: { token } });
        }
    };

    const removeFromCart = async (itemId) => {
        setCartItems((prev) => {
            if (!prev[itemId]) return prev;
            const newCount = prev[itemId] - 1;
            if (newCount > 0) {
                return { ...prev, [itemId]: newCount };
            } else {
                const { [itemId]: _, ...newCart } = prev;
                return newCart;
            }
        });
        if (token) {
            await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token } });
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price * cartItems[item];
            }
        }
        return totalAmount;
    };

    const fetchFoodList = async () => {
        const response = await axios.get(url + '/api/food/list');
        setFoodList(response.data.data);
    };

    const loadCartData = async (token) => {
        const response = await axios.post(url + '/api/cart/get', {}, { headers: { token } });
        setCartItems(response.data.cartData);
    };

    useEffect(() => {
        async function loadData() {
            await fetchFoodList();
            const localToken = localStorage.getItem("token");
            if (localToken) {
                setToken(localToken);
                await loadCartData(localToken);
            }
        }
        loadData();
    }, []);

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken
    };

    return (
        <storeContext.Provider value={contextValue}>
            {props.children}
        </storeContext.Provider>
    );
};

export default StoreContextProvider;
