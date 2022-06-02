const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authorize = (req, res, next) => {
    let cookie = req.cookies.USER_AUTH
    if (!cookie) return res.status(401).send({message: 'Please login'})
    
    jwt.verify(cookie, process.env.JWT_SECRET, async function(err, decode){
        const user = await User.findOne({_id: decode._id})
        if (!user) return res.status(400).send({message: 'User not found'})
        next()
    })   
}

module.exports = authorize