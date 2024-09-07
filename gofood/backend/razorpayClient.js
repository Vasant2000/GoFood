 require('dotenv').config({path:"../backend/config.env"})
console.log("RazorpayClient")

const Razorpay = require('razorpay');

const instance = new Razorpay({
key_id: process.env.razorpay_api_key,
key_secret: process.env.razorpay_api_secretkey

});

console.log()

module.exports = instance;