const user = require('../model/sell');
// Create a new sell
exports.createSell = async (req, res) => {
    const { product, quantity, price } = req.body;
    const newSell = new user({
        product,
        quantity,
        price
    });
    try {
        const savedSell = await newSell.save();
        res.status(201).json(savedSell);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Get all sells
exports.getAllSells = async (req, res) => {
    try {
        const sells = await user.find();
        res.status(200).json(sells);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Get a sell by id
exports.getSell = async (req, res) => {
    const { id } = req.body;
    try {
        const sell = await user.findById(id);
        if (sell == null) {
            return res.status(404).json({ message: 'Cannot find sell' });
        }
        res.status(200).json(sell);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
// Update a sell
exports.updateSell = async (req, res) => {
    const { id } = req.body;
    try {
        const updatedSell = await user.findByIdAndUpdate(id, { new: true });
        res.status(200).json(updatedSell);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
// Delete a sell
exports.deleteSell = async (req, res) => {
    const { id } = req.body;
    try {
        await user.findByIdAndDelete(id);
        res.status(200).json({ message: 'Deleted sell' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
