const Categorie = require('../model/Categorie');

// Controller functions

const getAllCategories = async (req, res) => {
    try {
        const categories = await Categorie.find();
        if (!categories.length) {
            return res.status(404).json({ message: 'No categories found' });
        }
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoryById = async (req, res) => {
    const { id } = req.body;
    try {
        const category = await Categorie.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    const { name} = req.body;
    if (!name) {
        return res.status(400).json({ message: 'Name is required' });
    }
    const newCategory = new Categorie({ name});
    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    const { id } = req.body;
    try {
        const updatedCategory = await Categorie.findByIdAndUpdate(
            id
        );
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    const { id } = req.body;
    try {
        const deletedCategory = await Categorie.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory }
