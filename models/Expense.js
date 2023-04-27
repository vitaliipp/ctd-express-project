const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      default: Date.now,
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
    },
    amount: {
      type: Number,
      required: true,
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
