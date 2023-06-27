import React from 'react';
import homeImage from './background.jpg';

function Home() {
  return (
    <div className="relative">
      <img
        src={homeImage}
        alt="Home Image"
        className="w-full h-auto"
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h1 className="text-4xl font-bold text-customRed mb-4">
          Scribble Sync
        </h1>
        <p className="text-lg text-customLightOrange">
          Get Registered Today
        </p>
      </div>
    </div>
  );
}

export default Home;
