const razorpayClient = require('../razorpayClient');
const express = require("express");
const router = express.Router();
const Order = require("../models/Orders")
const app = express();
const axios = require("axios")
const Razorpay = require('razorpay');

require('dotenv').config({path:"../backend/config.env"})
//const checkout = require("../Controllers/paymentController")
//require("")
app.use(express.json());

router.post('/payment',async(req,res) =>{
    
    const price = req.body.totalPrice
    
    console.log("total is",price)

   const response = await axios.post("http://localhost:5000/api/checkout",{price})//.then((result)=>{console.log(result.data.order.amount_paid)})
   console.log("payData",response.data.success)
   if(response.data.success ){
    console.log("payment")
    res.status(200).json({ success: true,id: response.data.order.id})
   }
   else res.send(400)
})




module.exports = router
