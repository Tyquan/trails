const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncomeModelSchema = new Schema({
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
        default: 'Income'
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
const Income = mongoose.model('Income', IncomeModelSchema );

module.exports = Income;