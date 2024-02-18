const express = require('express');
const router = express.Router();
const userController = require('../controllers/sellController');


router.route('/')
.get( userController.getAllSells)
.get( userController.getSell)
.post( userController.createSell)
.put( userController.updateSell)
.delete( userController.deleteSell)

module.exports = router;