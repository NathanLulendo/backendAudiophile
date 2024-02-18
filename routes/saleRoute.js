const express = require('express');
const router = express.Router();
const userController = require('../controllers/saleController');


router.route('/')
.get( userController.getAllSales)
.get( userController.getSale)
.post( userController.createSale)
.put( userController.updateSale)
.delete( userController.deleteSale)

module.exports = router;