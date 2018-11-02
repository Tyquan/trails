const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseModelSchema = new Schema({
    title: {
    	type: String
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
    	type: String,
    	required: true
    },
    modelV: {
        type: String,
        default: 'Expense'
    },
    due_date: {
    	type: Date
    },
    create_date: {
    	type: Date,
    	default: Date.now
    }
});

new mongoose.Schema({
  username: String
}, {
  usePushEach: true
});

// Compile model from schema
const Expense = mongoose.model('Expense', ExpenseModelSchema );

module.exports = Expense;