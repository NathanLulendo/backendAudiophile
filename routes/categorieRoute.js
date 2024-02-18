const express = require('express');
const router = express.Router();

// Import the Categorie controller
const categorieController = require('../controllers/categorieController');

// Define the routes for the "categorie" resource
router.route('/')   
.get( categorieController.getAllCategories)
.get( categorieController.getCategoryById)
.post( categorieController.createCategory)
.put( categorieController.updateCategory)
.delete( categorieController.deleteCategory)

module.exports = router;
