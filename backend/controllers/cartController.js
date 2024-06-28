import userModel from '../models/userModel.js';

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let userData = await userModel.findOne({ _id: req.body.userId });
        let cartData = await userData.cartData
        if (!cartData[req.body.itemId]) {
            //add new item to cart
            cartData[req.body.itemId] = 1;  
        }
        else {
            // increment existing item quantity
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData: cartData})
        res.json({success: true, message: "Item added to cart"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error"})
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {}

// fetch user cart data
const getCart = async (req, res) => {}

export { addToCart, removeFromCart, getCart };