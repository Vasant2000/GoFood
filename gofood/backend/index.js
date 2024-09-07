const express = require("express");
const app = express();
const mongo = require("./mongo");
const mongoDB = require("./mongo");
const cors = require('cors')
require('dotenv').config({path:"../backend/config.env"})
console.log(process.env.razorpay_api_key)





app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
const port = 5000;
mongoDB();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
});

app.get("/api/getkey",(req,res)=>{
  res.status(200).json({ data: process.env.razorpay_api_key})
}) 



app.get("/", (req, res) => { 
  res.send("hello world");
});
 
app.get("/api/createuser", (req, res) => {
  res.send("Create User Page");
});

app.use("/api", require("./Routes/CreateUser"));
app.use("/api", require("./Routes/DisplayData"));
app.use("/api", require("./Routes/OrderData"));
app.use("/api", require("./Routes/Payment"));
app.use("/api", require("./Controllers/paymentController"));


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
