const express = require('express');
const router = express.Router();

// Import the Feedback model
const Feedback = require('../models/Feedback');

// @route   GET /api/feedback
// @desc    Get all feedback
router.get('/', async (req, res) => {
    try {
        const feedbacks = await Feedback.find().sort({ date: -1 });
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// @route   POST /api/feedback
// @desc    Submit new feedback
router.post('/', async (req, res) => {
    const { name, email, location, feedback, urgency } = req.body;

    // Simple validation
    if (!name || !email || !location || !feedback || !urgency) {
        return res.status(400).json({ message: "Please fill all fields." });
    }

    try {
        const newFeedback = new Feedback({
            name,
            email,
            location,
            feedback,
            urgency
        });

        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
