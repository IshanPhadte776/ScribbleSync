import React from "react";
import homeImage from './background.jpg';


function AboutUsPage() {
  return (
    <div className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">About Us</h1>
      <img
        src={homeImage}
        alt="Home Image"
        className="w-full h-auto"
      />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
              convallis leo. Aliquam erat volutpat. Nullam feugiat bibendum
              magna, nec sollicitudin turpis convallis vitae.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Explaination
            </h2>
            <p className="text-gray-600">
              Sed cursus lacinia lectus quis consectetur. Donec sit amet tellus
              id mi varius posuere vitae sed turpis. Curabitur ultrices interdum
              mauris nec sollicitudin.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
