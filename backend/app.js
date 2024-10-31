// backend/app.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Import the user routes
const errorHandler = require('./middleware/error'); // Import error handler middleware

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json()); // Body parser
app.use(errorHandler); // Global error handler

// Root route for server status
app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// User routes
app.use('/api/users', userRoutes); // Mount the user routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/CreativeConnect', {
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;
