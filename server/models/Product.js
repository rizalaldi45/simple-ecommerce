const mongoose = require('mongoose')
const User  = require('../models/User')
const { ObjectId } = require('mongodb')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
    },
    weight: {
        type: Number,
        trim: true,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    picture: {
        type: String,
        default: 'https://asset.msi.com/resize/image/global/product/product_1_20200309135716_5e65dabcea908.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png'
    },
    favoriteBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users'
    }]
},{timestamps: true})

ProductSchema.statics.addProductFavorite = async function(userId, productId){
    const user = await User.findOne({_id: userId}).populate("favorite", 'name picture price stock')
    const product = await Product.findOne({_id: productId})
    const userAlreadyFavorite = user.favorite.filter(e => e._id == productId)
    const productAlreadyFavorite = product.favoriteBy.filter(e => e == userId)

    if (userAlreadyFavorite.length && productAlreadyFavorite) {
        user.favorite = await user.favorite.filter(e => e._id != productId)
        product.favoriteBy = await product.favoriteBy.filter(e => e != userId)
        await user.save()
        await product.save()
        user.password = undefined
        return { status: 'ok', user, message: 'Product delete from favorite' }
    }
    
    user.favorite = await user.favorite.concat(ObjectId(productId))
    product.favoriteBy = await product.favoriteBy.concat(ObjectId(userId))
    await user.save()
    await product.save()
    const userNew = await User.findOne({_id: userId}).populate("favorite", 'name picture price stock')
    user.password = undefined
    return {status: 'ok', user: userNew , message: 'Favorite product successfully' }
}

const Product = mongoose.model('Products', ProductSchema)

module.exports = Product