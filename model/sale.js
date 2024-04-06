const mongoose = require('mongoose');

const saleSchema = new mongoose.Schema({
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
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  address: {
    type: String,
    required: true
  }
});

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;
