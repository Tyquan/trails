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
    author: {
    	type: Schema.Types.ObjectId,
    	ref: 'User'
    },
    due_date: {
    	type: Date
    },
    create_date: {
    	type: Date,
    	default: Date.now
    }
});

// Compile model from schema
const Expense = mongoose.model('Expense', ExpenseModelSchema );

module.exports = Expense;