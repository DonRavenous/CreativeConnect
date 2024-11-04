const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['artist', 'business'], required: true },
  bio: String,
  profilePic: String,
  mediums: [String],           // For artists
  portfolio: [String],         // For artists
  servicesNeeded: String,      // For businesses
  partnershipOpportunities: String // For businesses
});

module.exports = mongoose.model('User', userSchema);
