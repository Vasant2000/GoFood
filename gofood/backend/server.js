const express = require("express");
const app = express();
const Razorpay = require("razorpay")
require('dotenv').config({path:"../backend/config.env"})

app.use("/api", require("./Routes/Payment"));

//const razorpay_api_key = "rzp_test_VgiFlNXXFUrFOG"
//const razorpay_api_secretkey = "iH550Xp9uCyMvQnCcLlX8KSG"
//const port = 4000

const instance = new Razorpay({ 
    key_id: process.env.razorpay_api_key,
    key_secret: process.env.razorpay_api_secretkey

})
//console.log('Razorpay Instance:', instance,process.env.port); // Check what is actually imported

// Verify if `orders` is defined
if (!instance.orders) {
  throw new Error('Orders property is undefined on Razorpay instance');
}
else {console.log("working")}

app.listen(process.env.port, () => {
    console.log(`listening on port ${process.env.port}`)})
    
module.exports = instance