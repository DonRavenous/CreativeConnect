const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, enum: ['artist', 'business'], required: true },
  specialty: { 
    type: String, 
    required: function() { return this.role === 'artist'; } // Only required for artists 
  },
  bio: { type: String, required: true },
  portfolio: { 
    type: [String],
    validate: {
      validator: function(value) {
        return this.role === 'artist' ? value.length > 0 : true; // Only required for artists
      },
      message: 'Portfolio is required for artists.',
    },
  },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  // Business-specific fields
  servicesNeeded: {
    type: String,
    required: function() { return this.role === 'business'; } // Only required for businesses
  },
  partnershipOpportunities: {
    type: String,
    required: function() { return this.role === 'business'; } // Only required for businesses
  }
}, { timestamps: true });

module.exports = mongoose.model('Artist', ArtistSchema);
