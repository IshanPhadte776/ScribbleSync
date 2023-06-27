import React, { useState } from "react";
import SignUpLoginPopup from "../signUpLoginPopup/SignUpLoginPopup";

function Header({ isUserLoginedIn, username,handleNavigation  }) {
  const [isPopUpDisplayed, setDisplayPopup] = useState(false);

  const handleLoginClick = () => {
    setDisplayPopup(!isPopUpDisplayed);
  };

  return (
    <div>
      <div className="bg-gray-200 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">ScribbleSync</h1>
            </div>

            {isUserLoginedIn ? (
              <>
                <h2 className="text-lg cursor-pointer hover:text-blue-500 mr-4" onClick={() => handleNavigation("HomePage")} >
                  Home
                </h2>
                <h2 className="text-lg cursor-pointer hover:text-blue-500 mr-4" onClick={() => handleNavigation("MySchedulePage")}>
                  My Schedule
                </h2>
                <h2 className="text-lg cursor-pointer hover:text-blue-500 mr-4" onClick={() => handleNavigation("MyImagesPage")}>
                  My Images
                </h2>
                <h2 className="text-lg cursor-pointer hover:text-blue-500 mr-4">
                  {username}
                </h2>
              </>
            ) : (
              <>
                <h2 className="text-lg cursor-pointer hover:text-blue-500 mr-4" onClick={() => handleNavigation("HomePage")}>
                  Home
                </h2>
                <h2 className="text-lg cursor-pointer hover:text-blue-500 mr-4" onClick={() => handleNavigation("AboutUsPage")}>
                  About Us
                </h2>
                <h2 className="text-lg cursor-pointer hover:text-blue-500 mr-4" onClick={() => handleNavigation("RegisterPage")}>
                  Register
                </h2>
                <h2
                  className="text-lg cursor-pointer hover:text-blue-500 mr-4"
                  onClick={handleLoginClick}
                >
                  Login
                </h2>
              </>
            )}
          </div>
        </div>
      </div>

      
      {isPopUpDisplayed && (
        <SignUpLoginPopup isPopUpDisplayed={true}></SignUpLoginPopup>
      )}    </div>
  );
}

export default Header;
