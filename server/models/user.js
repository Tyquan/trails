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
    displayName: {
        type: String,
    },
    firstName: {
    	type: String,
        default: 'N/A'
    },
    lastName: {
    	type: String,
        default: 'N/A'
    },
    imageUrl: {
        type: String
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
        type: Boolean,
        default: false
    },
    expenses: [{ 
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
        due_date: {
            type: Date
        },
        create_date: {
            type: Date,
            default: Date.now
        }
    }],
    incomes: [{ 
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
        create_date: {
            type: Date,
            default: Date.now
        }
    }],
    posts: [{ 
        body: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
        },
        displayName: {
            type: String,
        },
        postImage: {
            data: Buffer,
            contentType: String
        },
        username: {
            type: String,
        },
        create_date: {
            type: Date,
            default: Date.now
        } 
    }],
    jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }],
    followers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    creation_date: {
    	type: Date,
    	default: Date.now
    }
}, {
  usePushEach: true
});

// Compile model from schema
const User = mongoose.model('User', UserModelSchema );

module.exports = User;