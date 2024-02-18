const mongoose = require('mongoose');

const sellSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Sell = mongoose.model('Sell', sellSchema);

module.exports = Sell;
