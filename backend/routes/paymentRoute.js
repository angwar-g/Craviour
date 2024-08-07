import express from 'express';

const paymentRouter = express.Router();

// ROUTE 1
paymentRouter.get('/get-payment', (req, res) => {
    res.json("Payment Details");
})

// const razorpayInstance = new Razorpay({
//     key_id: ({}).RAZORPAY_KEY_ID,
//     key_secret: ({}).RAZORPAY_SECRET,
// });

export default paymentRouter