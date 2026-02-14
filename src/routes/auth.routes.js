const express = require("express")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const crypto = require("crypto")


const userModel = require("../models/user.model")

const authRouter = express.Router()

authRouter.post("/register", async (req, res) => {
    const {name, email, password} = req.body

    const isUserAlreadyExists = await userModel.findOne({email})

    if(isUserAlreadyExists) {
        return res.status(409).json({
            message: "Account already exists with the same email address"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")

    const user = await userModel.create({
        name, email, password: hash 
    })

    const token = jwt.sign(
        {
        id: user._id,
        email: user.email
        },
        process.env.JWT_SECRET
    )

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User registered successfully",
        user,
        token

    })

})
/*
* api/auth/protected
*/
authRouter.post("/protected", (req, res) => {
    console.log(req.cookies)

    res.status(200).json({
        message: "This is a protected message"
    })
})
/*
* Controller
*/
authRouter.post("/login", async (req, res) => {
    const {email, password} = req.body;

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message: "User not found with this email address"
        })
    }

    const isPasswordMatched =
      user.password === crypto.createHash("md5").update(password).digest("hex");

    if(!isPasswordMatched){
        return res.status(401).json({
            message: "Invalid Password"
        })
    }
    const token = jwt.sign({
        id: user.id,
    },process.env.JWT_SECRET)

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "User logged in Successfully",
        user
    })

})
module.exports = authRouter