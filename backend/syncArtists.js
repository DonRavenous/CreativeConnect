const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Artist = require('./models/Artist');

async function syncArtists() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/CreativeConnect', {});
    console.log('Connected to MongoDB');

    // Read artist data from JSON file
    const artistFilePath = path.join(__dirname, 'data', 'artists.json');
    const artistData = JSON.parse(fs.readFileSync(artistFilePath, 'utf8'));

    // Loop through each artist in the JSON data
    for (const artist of artistData) {
      // Find the artist in the database by name or add a new entry if not found
      let dbArtist = await Artist.findOne({ name: artist.name });

      if (dbArtist) {
        // Update existing artist with new fields and get MongoDB _id
        dbArtist.role = artist.role || 'artist';
        dbArtist.bio = artist.bio;
        dbArtist.portfolio = artist.portfolio;
        dbArtist.lat = artist.lat;
        dbArtist.lng = artist.lng;

        // Assign specialties or services based on role
        if (artist.role === 'artist') {
          dbArtist.specialty = artist.specialty || '';
          dbArtist.mediums = artist.mediums || []; // Or use [artist.specialty]
        } else if (artist.role === 'business') {
          dbArtist.servicesNeeded = artist.servicesNeeded || '';
          dbArtist.partnershipOpportunities = artist.partnershipOpportunities || '';
        }

        // Save updates and set artist's JSON id to MongoDB _id
        await dbArtist.save();
        artist.id = dbArtist._id.toString();
        console.log(`Updated artist: ${artist.name}`);
      } else {
        // Create a new artist and save MongoDB _id
        const newArtist = await Artist.create({
          name: artist.name,
          role: artist.role || 'artist',
          bio: artist.bio,
          portfolio: artist.portfolio,
          lat: artist.lat,
          lng: artist.lng,
          specialty: artist.specialty || '',
          mediums: artist.mediums || [],
          servicesNeeded: artist.servicesNeeded || '',
          partnershipOpportunities: artist.partnershipOpportunities || '',
        });

        artist.id = newArtist._id.toString(); // Save MongoDB id to JSON
        console.log(`Added new artist: ${artist.name}`);
      }
    }

    // Write updated artist data back to the JSON file
    fs.writeFileSync(artistFilePath, JSON.stringify(artistData, null, 2));
    console.log('Artist data synchronization complete');
  } catch (error) {
    console.error('Error syncing artists:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the sync process
syncArtists();
