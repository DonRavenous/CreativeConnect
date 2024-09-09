import React from 'react';
import ArtistList from './ArtistList';
import Map from './Map';
import Search from './Search';

function Home() {
  return (
    <div>
        <Search /> {/* Search bar will float in the top middle */}
        {/* Other content of the Home page */}
      <Map />
      <ArtistList />
    </div>
  );
}

export default Home;
