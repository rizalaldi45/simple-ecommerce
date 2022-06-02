const express = require('express')
const router = express.Router()
const UserController = require('../controllers/UserController')
const ProductController = require('../controllers/ProductController')
const Authorize = require('../middleware/authorize')

// user
router.post('/api/user/register', UserController.userRegister)
router.post('/api/user/signin', UserController.userSignin)
router.get('/api/user/signout', UserController.userLogout)
router.post('/api/user/:userId/favorite/:productId', Authorize, ProductController.favoriteProduct)
router.post('/api/user/city', UserController.getCityCode)

// product
router.post('/api/product/add', ProductController.addProduct)
router.get('/api/product/show', ProductController.showProduct)
router.get('/api/product/:productId', ProductController.getProductById)
router.post('/api/product/shipping', ProductController.getOngkirCost)


module.exports = router