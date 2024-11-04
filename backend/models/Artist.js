const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  specialty: {
    type: String,
    required: true
  },
  bio: {
    type: String,
    required: true
  },
  portfolio: [
    {
      type: String // Array of image URLs for portfolio items
    }
  ],
  lat: {
    type: Number,
    required: true
  },
  lng: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);