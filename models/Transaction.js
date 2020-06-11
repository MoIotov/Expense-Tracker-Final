const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: [true, 'Please type name of transaction']
  },
  amount: {
    type: Number,
    required: [true, 'Type in possitive or negative number']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', TransactionSchema);