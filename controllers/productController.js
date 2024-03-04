const Product = require('../model/Product');

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
    } = req.body;

    let image = '';
    let gallery = [];

    if (req.files['image']) {
        image = req.files['image'][0].filename;
    }
    
    if (req.files['gallery']) {
        gallery = req.files['gallery'].map(file => file.filename);
    }

    console.log(req.files);


    if ( !name || !category || !price || !description || !features || !includes || !gallery) {
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

    let productFields = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        features: req.body.features,
        includes: req.body.includes,
    };

    let image = '';
    let gallery = [];

    if (req.files['image']) {
        image = req.files['image'][0].filename;
        productFields.image = image;
    }

    if (req.files['gallery']) {
        gallery = req.files['gallery'].map(file => file.filename);
        productFields.gallery = gallery;
    }

    try {
        let product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        product = await Product.findByIdAndUpdate(id, { $set: productFields }, { new: true });
        res.status(200).json(product);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
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