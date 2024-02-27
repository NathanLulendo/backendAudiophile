const mongoose = require('mongoose');


const IncludedItemSchema = new mongoose.Schema({
    quantity: Number,
    item: String
});

const OtherProductSchema = new mongoose.Schema({
    name: String,
    image: String
}, {_id: false});


const ProductSchema = new mongoose.Schema({
    name: String,
    image: String,
    category: String,
    price: Number,
    description: String,
    features: String,
    includes: [IncludedItemSchema],
    gallery: [String],
    others: [OtherProductSchema]
});

module.exports = mongoose.model('Product', ProductSchema);