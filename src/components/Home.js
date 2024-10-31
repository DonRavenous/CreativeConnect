import React from 'react';
import Map from './Map';

function Home({ artistData }) {
  return (
    <div>
              <Map artistData={artistData} /> {/* Pass artistData as prop */}
          </div>
  );
}


export default Home;
