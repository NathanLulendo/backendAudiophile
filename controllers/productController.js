const Product = require('../model/Product');

const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },  
    filename: function (req, file, cb) {
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ storage: storage, fileFilter: fileFilter });

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products.length) {
            return res.status(404).json({ message: 'No products found' });
        }
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProduct = async (req, res) => {
    const { id } = req.params;
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

    const {
        name,
        category,
        price,
        description,
        features,
        includes,
        gallery,
        others
    } = req.body;
    const { 
        image
    } = req.file.filename;
    
    if ( !name || !image || !category || !price || !description || !features || !includes || !gallery || !others) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const product = new Product({
        // Fill in product data from req.body
        name,
        image,
        category,
        price,
        description,
        features,
        includes,
        gallery,
        others
    });
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, image, category, price, description, features, includes, gallery, others } = req.body;
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, { name: name, image: image, category: category, price: price, description: description, features: features, includes: includes, gallery: gallery, others: others }, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
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