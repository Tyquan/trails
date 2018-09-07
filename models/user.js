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
    	type: String,
        default: 'N/A'
    },
    lastName: {
    	type: String,
        default: 'N/A'
    },
    city: {
    	type: String,
        default: 'N/A'
    },
    state: {
    	type: String,
        default: 'N/A'
    },
    role: {
    	type: String,
    	default: 'user'
    },
    loggedIn: {
        type: Boolean
    },
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expense' }],
    interests: [{ type: Schema.Types.ObjectId, ref: 'Interest' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    creation_date: {
    	type: Date,
    	default: Date.now
    }
});

// Compile model from schema
const User = mongoose.model('User', UserModelSchema );

module.exports = User;