import React, { useContext } from 'react'
import './Cart.css'
import { storeContext } from '../../context/StoreContext'
import Footer from '../../components/Footer/Footer'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {cartItems, food_list, addToCart, removeFromCart, getTotalCartAmount} = useContext(storeContext)

  const navigate = useNavigate()
  return (
    <>
    <div className='cart'>
      <div className='cart-items'>
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Add</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if(cartItems[item._id] > 0) {
            return (
              <div>
              <div className='cart-items-title cart-items-item'>
                <img src={item.image} alt="" />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{item.price * cartItems[item._id]}</p>
                <p onClick={() => addToCart(item._id)} className='plus'>+</p>
                <p onClick={() => removeFromCart(item._id)} className='minus'>-</p>
              </div>
              <hr/>
              </div>
            )
          }
        })}
      </div>
      <div className='cart-bottom'>
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Sub Total</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Charges</p>
              <p>₹{getTotalCartAmount()===0? 0: 20}</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>₹{getTotalCartAmount()===0?0 : getTotalCartAmount() + 20}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo-code">
          <div>
            <p>Apply Promo Code</p>
            <div className='cart-promo-code-input'>
              <input type="text" placeholder="Enter Promo Code"/>
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* <Footer/> */}
    </>
  )
}

export default Cart