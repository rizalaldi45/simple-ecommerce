const request = require("request");
const Product = require('../models/Product')

exports.addProduct = async (req, res) => {
    try {
        const product = await new Product(req.body)
        await product.save()
        res.status(201).json({status: 'ok', product})
    } catch (e) {
        res.status(500).json({status: 'err', message: e})
    }
}

exports.showProduct = async (req, res) => {
    try {
        const products = await Product.find({}).populate("favoriteBy", "_id name email favorite")
        res.status(200).json({status: 'ok', products})
    } catch (e) {
        res.status(500).json({status: 'err', message: e})
    }
}

exports.getProductById = async (req, res) => {
    try {
        const products = await Product.findOne({_id: req.params.productId}).populate("favoriteBy", "_id name email favorite")
        res.status(200).json({status: 'ok', products})
    } catch (e) {
        res.status(500).json({status: 'err', message: e})
    }
}

exports.favoriteProduct = async (req, res) => {
    try {
        let userFavorite = await Product.addProductFavorite(req.params.userId, req.params.productId)
        res.status(200).send({data: userFavorite})
    } catch (e) {
        res.status(500).json({status: 'err', message: e})
    }
}

exports.getOngkirCost = (req, res) => {
    var options = {
      method: 'POST',
      url: 'https://api.rajaongkir.com/starter/cost',
      headers: {key: process.env.RAJAONGKIR_KEY, 'content-type': 'application/x-www-form-urlencoded'},
      form: {origin: '152', destination: req.body.city, weight: req.body.weight, courier: 'jne'}
    };
    
    request(options, function (err, response, body) {
      if (err) res.status(500).json({status: 'err', message: err})
    
      res.status(200).send(JSON.parse(body))
    });
}