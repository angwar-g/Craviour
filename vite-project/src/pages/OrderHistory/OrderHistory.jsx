import React, { useContext, useEffect, useState } from 'react';
import './OrderHistory.css';
import { storeContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const OrderHistory = () => {
  const { url, token } = useContext(storeContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.post(url + '/api/order/userorders', {}, { headers: { token } });
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 || !token ? (
          <p>No order history to show</p>
        ) : (
          data.map((order, index) => (
            <div key={index} className="my-orders-order">
              <img src={assets.parcel_icon} alt="Parcel Icon" />
              <p>
                {order.items.map((item, itemIndex) => (
                  <span key={itemIndex}>
                    {item.quantity} x {item.name} 
                    {itemIndex < order.items.length - 1 ? <br />  : ''}
                  </span>
                ))}
              </p>
              <p>₹{order.amount}.00</p>
              <p>Items: {order.items.length}</p>
              <p><span>&#x25cf;</span><b>{order.status}</b></p>
              <button onClick={fetchOrders}>Track Order</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
