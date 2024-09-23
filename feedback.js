const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Feedback Schema
const FeedbackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    urgency: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
