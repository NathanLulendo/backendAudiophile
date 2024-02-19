const sale = require('../model/sale');
// Create a new sale
exports.createSale = async (req, res) => {
    const { product, quantity, price } = req.body;
    if (!product || !quantity || !price) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    const newSale = new sale({
        product,
        quantity,
        price,
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
exports.getAllSales = async (req, res) => {
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
exports.getSale = async (req, res) => {
    const { id } = req.body;
    try {
        const sale = await sale.findById(id);
        if (sell == null) {
            return res.status(404).json({ message: 'Cannot find sale' });
        }
        res.status(200).json(sale);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Update a sale
exports.updateSale = async (req, res) => {
    const { id } = req.body;
    try {
        const updatedSale = await sale.findByIdAndUpdate(id, { new: true });
        res.status(200).json(updatedSale);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Delete a sale
exports.deleteSale = async (req, res) => {
    const { id } = req.body;
    try {
        await sale.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted sale' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
