const mongoose = require('mongoose');


const IncludedItemSchema = new mongoose.Schema({
    quantity: Number,
    item: String
});


const ProductSchema = new mongoose.Schema({
    name: String,
    image: String,
    category: String,
    price: Number,
    description: String,
    features: String,
    includes: [IncludedItemSchema],
    gallery: [String],
});

module.exports = mongoose.model('Product', ProductSchema);