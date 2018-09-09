const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    user: {
    	type: String
    },
    modelV: {
        type: String,
        default: 'Post'
    },
    create_date: {
    	type: Date,
    	default: Date.now
    }
});

// Compile model from schema
const Post = mongoose.model('Post', PostSchema );

module.exports = Post;