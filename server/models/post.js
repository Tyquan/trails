const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostModelSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    user: {
        type: String,
    },
    username: {
        type: String,
    },
    create_date: {
        type: Date,
        default: Date.now
    }
}, {
  usePushEach: true
});

// Compile model from schema
const Post = mongoose.model('Post', PostModelSchema );

module.exports = Post;