const sale = require('../model/sale');
// Create a new sale
const createSale = async (req, res) => {
    const { product, totalAmount, userId, address} = req.body;
    if (!product || !totalAmount || !userId || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newSale = new sale({
        product,
        totalAmount,
        userId,
        address,
        date: Date.now()
    });
    try {
        const savedSale = await newSale.save();
        res.status(201).json(savedSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Get all sales
const getAllSales = async (req, res) => {
    try {
        const sales = await sale.find();

        if (!sales.length) {
            return res.status(404).json({ message: 'No sales found' });
        }
        res.status(200).json(sales);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Get a sale by id
const getSale = async (req, res) => {
    const { id } = req.params;
    try {
        const sale = await sale.findById(id);
        if (sale == null) {
            return res.status(404).json({ message: 'Cannot find sale' });
        }
        res.status(200).json(sale);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Update a sale
const updateSale = async (req, res) => {
    const { id } = req.params;
    let saleFields = {
        product: req.body.product,
        totalAmount: req.body.totalAmount,
        userId: req.body.userId,
        address: req.body.address
    };

    try {
        let sale = await sale.findById(id);
        if (sale == null) {
            return res.status(404).json({ message: 'Cannot find sale' });
        }
        sale = await sale.findByIdAndUpdate(id, { $set: saleFields }, { new: true });
        res.status(200).json(sale);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Delete a sale
const deleteSale = async (req, res) => {
    const { id } = req.params;
    try {
        await sale.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted sale' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createSale,
    getAllSales,
    getSale,
    updateSale,
    deleteSale
};

