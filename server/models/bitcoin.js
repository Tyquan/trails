const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BitcoinModelSchema = new Schema({
    price: {
        type: Number
    },
    modelV: {
        type: String,
        default: 'Bitcoin'
    },
    timestamp: {
    	type: Date,
    	default: Date.now
    }
});

// Compile model from schema
const Bitcoin = mongoose.model('Bitcoin', BitcoinModelSchema );

module.exports = Bitcoin;