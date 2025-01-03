const User = require('../models/userModel')
const { createSecretToken } = require('../util/SecretToken')
const bcrypt = require('bcryptjs')

module.exports.Signup = async(req, res, next) => {
    try {
        const { email, password, username } = req.body;
        const existingUser = await User.findOne({ email })

        if(existingUser) {
            return res.json({ message: 'User already exists' })
        } 

        const user = await User.create({ email, password, username})
        const token = createSecretToken(user._id);


        res.cookie("token", token, {
            httpOnly: true,        // Secure: prevent access via JavaScript
            // sameSite: "none",      // Allow cross-origin requests
            // secure: false,          // Use true in production with HTTPS
            // path: "/",             // Must match the path for clearing
          });
        res.status(201).json({message: 'Sign in successful', success: true, user})
        next()

    } catch (e) {
        console.error(e)
    }
}

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if(!email || !password) {
            return res.json({message: 'All fields are required'})
        }

        const user = await User.findOne({ email })
        if(!user) {
            return res.json({message: 'Incorrect email or password'})
        }

        const auth = await bcrypt.compare(password, user.password)
        if(!auth) {
            return res.json({message: 'Incorrect email or password'})
        }

        const token = createSecretToken(user._id)

        res.cookie("token", token, {
            httpOnly: true,        // Secure: prevent access via JavaScript
            // sameSite: "none",      // Allow cross-origin requests
            // secure: false,          // Use true in production with HTTPS
            // path: "/",             // Must match the path for clearing
          });
        

        res.status(201).json({ message: "User logged in successfully", success: true})
        next()

    } catch (e) {
        console.error(e)
    }
}