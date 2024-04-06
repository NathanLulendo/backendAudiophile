const mongoose = require('mongoose');

const salesItemSchema = new mongoose.Schema({
  quantity: Number,
  item: String,
  price: Number
});



const saleSchema = new mongoose.Schema({
  product:[salesItemSchema],
  totalAmount: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: String,
    ref: 'User'
  },
  address: {
    type: String,
    required: true
  }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
