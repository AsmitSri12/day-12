const express = require("express")

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

    const user = await userModel.create({
        name, email, password
    })
    res.status(201).json({
        message: "User registered successfully",
        user

    })
})

module.exports = authRouter