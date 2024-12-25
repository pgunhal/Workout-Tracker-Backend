const User = require("../models/userModel")
require("dotenv").config()
const jwt = require("jsonwebtoken")

module.exports.userVerification = (req, res) => {
    const token = req.cookies.token 
    if(!token) {
        console.log("no token found")
        return res.json({ status: false })
    }
    jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
        if (err) {
            console.log("verification falied", err.message)
            return res.json({ status: false })
        } 

        const user = await User.findById(data.id)
        if (user) 
            return res.json({status: true, user: user.username})
        else 
            return res.json({ status: false })
    })
}


