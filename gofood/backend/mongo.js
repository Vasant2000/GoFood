const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://raovasant4:mern123@cluster0.w5ehfuc.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = async () => {
  const conn = await mongoose.connect(mongoURL).then(console.log("Connected")).catch(err => console.log(err.reason));
  const coll = await mongoose.connection.listCollections();
  //console.log(coll)
  
const data = await mongoose.connection.db.collection("foodcategory").find({}).toArray();
  if(data.length > 0){global.food_category = data;
    console.log("food category here" )
  }
  else console.log("Could not find")
  
  const items = await mongoose.connection.db.collection("fooditems").find({}).toArray();
  if(items.length > 0){global.food_items = items;
    console.log("food items here" )
  }
  else console.log("Could not find")

  const season = await mongoose.connection.db.collection("foodseason").find({}).toArray();
  if(season.length > 0){global.food_season= season;
    console.log("food season here" )
  }
  else console.log("Could not find")  
  
};

module.exports = mongoDB;
