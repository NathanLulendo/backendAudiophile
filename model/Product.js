const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    mobile: String,
    tablet: String,
    desktop: String
}, {_id: false});

const IncludedItemSchema = new mongoose.Schema({
    quantity: Number,
    item: String
}, {_id: false});

const OtherProductSchema = new mongoose.Schema({
    slug: String,
    name: String,
    image: ImageSchema
}, {_id: false});

const ProductSchema = new mongoose.Schema({
    id: Number,
    slug: String,
    name: {
        type: String,
        required: true
    },
    image: ImageSchema,
    category: String,
    categoryImage: ImageSchema,
    new: Boolean,
    price: Number,
    description: String,
    features: String,
    includes: [IncludedItemSchema],
    gallery: {
        first: ImageSchema,
        second: ImageSchema,
        third: ImageSchema
    },
    others: [OtherProductSchema]
});

module.exports = mongoose.model('Product', ProductSchema);