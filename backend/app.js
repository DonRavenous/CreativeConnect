// backend/app.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js'); // Import the user routes
const auth = require('./middleware/auth');
const errorHandler = require('./middleware/errorMiddleware');

app.use(errorHandler); // Global error handler


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Routes
app.use('/api/users', userRoutes); // Mount the routes

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/CreativeConnect', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

