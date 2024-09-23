const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const feedbackRoutes = require('./routes/feedback');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection (replace with your connection string)
const mongoURI = 'mongodb://localhost:27017/road-maintenance-feedback';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Routes
app.use('/api/feedback', feedbackRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
