const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlockModelSchema = new Schema({
    index: {
        type: Number
    },
    previousHash: {
        type: String
    },
    data: {
        amount: { type: Number }
    },
    hash: {type: String},
    nonce: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    timestamp: {
    	type: Date,
    	default: Date.now
    }
});

// Compile model from schema
const BlockModel = mongoose.model('BlockModel', BlockModelSchema );

module.exports = BlockModel;