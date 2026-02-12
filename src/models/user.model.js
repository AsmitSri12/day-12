const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: [true, "With this email account user account already exists"]
        // this is used to avoid the repetitive of same email address.
    },
    password: String, 
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel