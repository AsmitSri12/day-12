const mongoose = require("mongoose")
require("dotenv").config()

function connectToDb(){
    mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("connected to db")
    })
}

module.exports = connectToDb