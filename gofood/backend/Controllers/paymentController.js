const express = require("express");
const app = express();
app.use(express.json());
const razorpayClient = require("../razorpayClient");
const router = express.Router();
const crypto = require("crypto");
require("dotenv").config({ path: "../backend/config.env" });
//const Razorpay = require('razorpay');
//const razorpay_api_key = "rzp_test_VgiFlNXXFUrFOG"
//const razorpay_api_secretkey = "iH550Xp9uCyMvQnCcLlX8KSG"
//const instance = require("../server.js")
/*const instance = new Razorpay({
    key_id: razorpay_api_key,
    key_secret: razorpay_api_secretkey

})*/

router.post("/checkout", async (req, res) => {
  try {
    //console.log(razorpayClient)

    const options = {
      amount: req.body.price*100, // Amount in the smallest currency unit (e.g., paise for INR)
      currency: "INR",
      receipt: "order_rcptid_11",
      payment_capture: 1, // 1 for automatic capture
    };

    const order = await razorpayClient.orders.create(options);

    // Log order details for debugging
    console.log(order.amount);

    // Send response with order details
    res.status(200).json({ success: true, order });
  } catch (error) {
    // Log and return error details
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
//razorpay_payment_id: 'pay_OnzZpIJtlXZxLy',
// razorpay_order_id: 'order_OnzYGE4fFFXS5v',
// razorpay_signature: '9c22b168d4e3e3b4d13b5957ab863fba8155171806004201f6f3bb72dea52a5e'
router.post("/payVer", async (req, res) => {
  global.paymentYes = false
  console.log(req.body);
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.razorpay_api_secretkey)
    .update(body.toString())
    .digest("hex");
    console.log("sig received",razorpay_signature)
    console.log("sig generated",expectedSignature)
    
 // let response = {"signatureIsValid":"false"}
  //if(expectedSignature === razorpay_signature){
    //response = {"signatureIsValid":"true"}
    //res.send(response)
  //}

  let IsValid = expectedSignature === razorpay_signature

  if(IsValid){
   //global.payhmentYes = true
    //res.status(200).json({ success: true })
    res.status(200).redirect("http://localhost:3000/paymentSuccess");
  }
  else {
    
    res.status(400).json({ success: false }).redirect("http://localhost:3000")
  }

});

module.exports = router;
