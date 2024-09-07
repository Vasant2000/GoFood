const express = require("express");
const app = express();
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const jwtSecret = "Thisismyfirstmernappever"
app.use(express.json());

router.post("/createuser",
  [
    body("name", "invalid name").isLength({ min: 3 }),
    body("password", "incorrect pasword").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const verEmail = req.body.email
    
    if (!errors.isEmpty()) {
      console.log("validation error is here");
      return res.status(400).json({ success:false});
    }

    const exist = await User.exists({email:verEmail})

    if(exist !== null){{{console.log("Email already in use")
        return res.status(300).json({success:false})}
  }}
   const salt = await bcrypt.genSalt(10)
   const secPassword = await bcrypt.hash(req.body.password,salt)

    
    try {
      await User.create({
        name: req.body.name,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }));
    } catch (error) {
      console.log("there is error", req.body);
      res.json({ success: false });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    let email = req.body.email;

    let userData = await User.findOne({ email: email });
    if (!userData) {
      return res.status(400).json({ error: "Incorrect Creds" });
    }
      console.log(req.body.password,userData.password)
      const password  = req.body.password
      const pwdCompare = await bcrypt.compare(password,userData.password)
      console.log(pwdCompare)
    if (!pwdCompare) {
      
      return res.status(301).json({ error: "Incorrect Creds" });
    } 
      const data ={
        user:{
          id:userData.id
        }
      }
      const authToken = await jwt.sign(data,jwtSecret)

      return res.json({ success: true , authToken : authToken});
    
  } catch (error) {
    console.log("there is error", req.body);
    return res.json({ success: false });
  }
});

module.exports = router;
