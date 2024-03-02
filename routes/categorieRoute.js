const express = require('express');
const router = express.Router();

// Import the Categorie controller
const categorieController = require('../controllers/categorieController');

// Define the routes for the "categorie" resource
router.get('/', categorieController.getAllCategories);
router.get('/:id', categorieController.getCategoryById);
router.post('/', categorieController.createCategory);
router.put('/:id', categorieController.updateCategory);
router.delete('/:id', categorieController.deleteCategory);

module.exports = router;
