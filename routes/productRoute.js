const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.route('/') 
.get(productController.getAllProducts)
.get(productController.getProduct)
.post(productController.createProduct)
.put(productController.updateProduct)
.delete(productController.deleteProduct);

module.exports = router;