
const express = require("express");

const router = express.Router();


router.get('/foodData',(req,res)=>{
    try {
        console.log(global.food_category)
        res.send([global.food_category,global.food_items,global.food_season])
    } catch (error) {
        console.error(error.message) 
        res.send("Server Error")
        
    }
})

router.post('/foodData',(req,res)=>{
    try {
        //console.log(global.food_category)
        res.send([global.food_category,global.food_items,global.food_season])
       
    } catch (error) { 
        console.error(error.message)
        res.send("Server Error")
        
    }
   
})



module.exports = router