const mongoose = require("mongoose");


const dbConnection = async() =>{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");

}
 

module.exports = dbConnection 