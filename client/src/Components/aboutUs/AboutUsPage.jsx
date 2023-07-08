import React from "react";
import homeImage from "./background.jpg";

function AboutUsPage() {
  return (
    <div className="bg-customPink py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          About Us
        </h1>
        <img src={homeImage} alt="Home Image" className="w-full h-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 text-justify">
              Our whiteboard application for kids aims to inspire creativity and
              foster interactive learning by providing a digital platform where
              children can unleash their imagination, collaborate with others,
              and explore various educational activities in a fun and engaging
              way.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Explaination
            </h2>
            <ol className="list-decimal text-gray-600">
              <li className=" text-justify">
                Teachers must register themselves and their students by clicking
                "Register".
              </li>
              <li className=" text-justify">Login.</li>
              <li className=" text-justify" >Join Class during the appropriate time.</li>
              <li className=" text-justify">
                Teachers can draw on the board, and students can watch the
                board.
              </li>
              <li className=" text-justify">Teachers can save images, and students can view them.</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUsPage;
