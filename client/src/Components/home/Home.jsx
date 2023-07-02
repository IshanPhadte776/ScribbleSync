import React, { useState } from "react";
import homeImage from "./background.jpg";
import SignUpLoginPopup from "../signUpLoginPopup/SignUpLoginPopup";

function Home({
  teacherInfo,
  studentInfo,
  onLoginSuccess,
  setIsUserLoggedIn,
  setTeacherInfo,
  setStudentInfo,
  setUserType,
  setCurrentPage,
  isUserLoggedIn,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isPopupDisplayed, setPopupDisplayed] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleLogin = () => {
    setPopupDisplayed(true);
  };

  return (
    <div className="relative">
      <img
        src={homeImage}
        alt="Home Image"
        className="w-screen h-screen"
        onLoad={handleImageLoad}
      />
      {isImageLoaded && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center mt-[-6.5rem]">
          <h1 className="text-4xl font-bold text-customRed mb-4">
            Scribble Sync
          </h1>
          {!isUserLoggedIn && <button
            className="bg-customLightOrange text-lg text-white py-2 px-4 rounded hover:bg-customOrange transform hover:scale-105 transition duration-300"
            onClick={handleLogin}
          >
            Get Logged In Today
          </button>}
        </div>
      )}
      {isPopupDisplayed && (
        <SignUpLoginPopup
          isPopUpDisplayed={true}
          onLoginSuccess={onLoginSuccess}
          setIsUserLoggedIn={setIsUserLoggedIn}
          teacherInfo={teacherInfo}
          studentInfo={studentInfo}
          setTeacherInfo={setTeacherInfo}
          setStudentInfo={setStudentInfo}
          setUserType={setUserType}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default Home;
