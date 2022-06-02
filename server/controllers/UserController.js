const User = require('../models/User')
const bcrypt = require('bcrypt')
const Cities = require('../models/Cities')
const jwt = require('jsonwebtoken')

exports.userRegister = async (req, res) => {
    try {
        const user = await new User(req.body)
        await user.save()
        user.password = undefined
        res.status(201).json({status: 'ok', data: user})
    } catch (e) {
        res.status(500).json({status: 'err', message: e})
    }
}

exports.userSignin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({email}).populate("favorite", 'name picture price stock')
        if (!user) res.status(400).send('User not found')
        await bcrypt.compare(password, user.password, function(err, result){
            if (!err) {
                user.password = undefined
                const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)
                res.cookie('USER_AUTH', token, {
                    httpOnly: true, // http only, prevents JavaScript cookie access
                    // secure: true // only works on https 
                });
                res.status(201).json({status: 'ok', user})
            }
        }) 
    } catch (e) {
        res.status(500).json({status: 'err', message: e})
    }
}

exports.userLogout = (req, res) => {
    try {
        res.clearCookie('USER_AUTH')
        res.status(200).json({status: 'ok', message: "Logout Successfully"})
    } catch (e) {
        res.status(500).json({status: 'err', message: e})
    }
}

exports.getCityCode = async (req, res) => {
    try {
        if (req.body.city == '') return res.status(400).json({status: 'City cant be empty'})
        const city = await Cities.find({city_name: RegExp(req.body.city, 'i')})
        res.status(200).json({status: 'ok', city})
    } catch(e) {
        res.status(500).json({status: 'err', message: e})
    }
}