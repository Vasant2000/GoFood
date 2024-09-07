const razorpayClient = require("../razorpayClient");
const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");
const app = express();
const axios = require("axios");
const Razorpay = require("razorpay");

require("dotenv").config({ path: "../backend/config.env" });
//const checkout = require("../Controllers/paymentController")
//require("")
app.use(express.json());

router.post("/orderData", async (req, res) => {
  let data = req.body.data;
  const price = req.body.totalPrice;
  console.log(data, req.body.userEmail);
  await data.splice(0, 0, { order_date: req.body.date });
  console.log("total is", price);

 /* const response = await axios.post("http://localhost:5000/api/checkout", {
    price,
  }); //.then((result)=>{console.log(result.data.order.amount_paid)})
  console.log("payData", response.data, process.env.razorpay_api_key);*/

  /*const options = {
    key_id: process.env.razorpay_api_key, // Enter the Key ID generated from the Dashboard
    one_click_checkout: true,
    name: "orderData Corp", //your business name
    order_id: response.data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1; mandatory
    show_coupons: true, // default true; false if coupon widget should be hidden
    callback_url: "http://localhost:5000/api/payVer",
    prefill: {
      //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
      name: "Gaurav Kumar", //your customer's name
      email: "gaurav.kumar@example.com",
      contact: "9000090000", //Provide the customer's phone number for better conversion rates
      coupon_code: "COUPON50", // any valid coupon code that gets auto-applied once magic opens
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
  };*/
 

  let eId = await Order.exists({ email: req.body.userEmail });
  console.log("eId", eId);
  if (eId === null) {
    try {
      console.log("try");
      await Order.create({
        email: req.body.userEmail,
        order_data: [data],
      }).then(() => {
        console.log(data);
       // res.json({ success: true, id: response.data.order.id });
        res.json({success:true}) //.status(200).send(options.order_id)
      });
    } catch (error) {
      console.log("error");
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.userEmail },
        { $push: { order_data: data } }
      ).then(() => {
        console.log("push");
       // res.json({ success: true, id: response.data.order.id});
        res.json({success:true}) //.send(options.order_id)
      });
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }
});

router.post("/myOrderData", async (req, res) => {
  try {
    console.log("try post");
    //let userEmail = localStorage.getItem("userEmail")

    let myData = await Order.findOne({ email: req.body.email });
    //res.json({orderData:myData})
    console.log(req.body.email);
    let order_data = myData.order_data;
    console.log(myData);
    //let result = separateOrdersByDate(order_data)
    // console.log(Object.values(order_data[0]))
    res.send(myData);
    //console.log(localStorage)
  } catch (error) {
    res.send("Server Error", error.message);
  }
});

router.get("/myOrderData", async (req, res) => {
  try {
    let userEmail = await localStorage.getItem("userEmail");
    console.log(userEmail);
    let myData = await Order.findOne({ email: userEmail });
    //res.json({orderData:myData})
    res.send(myData);
  } catch (error) {
    res.send("Server Error", error.message);
  }
});
module.exports = router;
