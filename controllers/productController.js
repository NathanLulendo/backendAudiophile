const Product = require('../model/Product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const product = await Product.findById(id);
        if (product == null) {
            return res.status(404).json({ message: 'Cannot find product' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createProduct = async (req, res) => {
    const product = new Product({
        // Fill in product data from req.body
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.body;
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted product' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};