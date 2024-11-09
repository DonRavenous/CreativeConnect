const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const Profile = require('./models/Profile'); // Import the Profile model
const errorHandler = require('./middleware/error');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});

// Mount routes
app.use('/api', userRoutes);
app.use('/api/users', userRoutes);
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB and initialize with placeholders if empty
mongoose.connect('mongodb://localhost:27017/CreativeConnect', {

})
  .then(() => {
    console.log('MongoDB connected');
    initializeDatabase(); // Call the function to load placeholders
  })
  .catch((err) => console.log('MongoDB connection error:', err));

async function initializeDatabase() {
  const profileCount = await Profile.countDocuments();
  if (profileCount === 0) {
    console.log('No profiles found in the database. Loading placeholders from artists.json...');
    const placeholderData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'artists.json'), 'utf-8'));
    try {
      await Profile.insertMany(placeholderData);
      console.log('Placeholders loaded successfully');
    } catch (error) {
      console.error('Error loading placeholders:', error);
    }
  }
}

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app;
