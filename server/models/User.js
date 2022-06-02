const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    favorite: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products'
    }],
}, {timestamps: true})

// UserSchema.pre('findOne', function(next){
//     this.populate('name')
//     next()
// })

UserSchema.pre('save', async function(next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('Users', UserSchema)

module.exports = User