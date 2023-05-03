const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
      required: [true, 'Please provide date'],
    },
    category: {
      type: String,
      enum: [
        'Food',
        'Shopping',
        'Housing',
        'Transportation',
        'Utilities',
        'Other',
      ],
      default: 'Shopping',
      required: [true, 'Please provide category'],
    },
    amount: {
      type: Number,
      required: [true, 'Please provide an amount'],
    },
    payment_type: {
      type: String,
      enum: ['Cash', 'Credit Card', 'Debit Card', 'Other'],
      default: 'Cash',
    },
    note: {
      type: String,
      maxlength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Expense', ExpenseSchema);
