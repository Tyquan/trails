const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModelSchema = new Schema({
    username: {
    	type: String,
    	required: true
    },
    password: {
    	type: String,
    	required: true
    },
    firstName: {
    	type: String
    },
    lastName: {
    	type: String
    },
    city: {
    	type: String
    },
    state: {
    	type: String
    },
    role: {
    	type: String,
    	default: 'user'
    },
    loggedIn: {
        type: Boolean
    },
    interests: [{ type: Schema.Types.ObjectId, ref: 'Interest' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    creation_date: {
    	type: Date,
    	default: Date.now
    },
    updated: {
    	type: Date, 
    	default: Date.now
    }
});

// Compile model from schema
const User = mongoose.model('User', UserModelSchema );

module.exports = User;