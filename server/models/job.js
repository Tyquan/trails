var mongoose = require('mongoose');

var jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    company: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    details: {
        type: String,
        required: true
    },
    shortDetails: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    applicants: [{
        fullname: {
            type: String
        },
        email: {
            type: String
        },
        phonenumber: {
            type: String
        },
        details: {
            type: String
        },
        date_created: {
            type: Date,
            default: Date.now
        }
    }],
    date_created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
    
}, {
  usePushEach: true
});

var Job = mongoose.model('Job', jobSchema);

module.exports = Job