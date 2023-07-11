import React, { useState } from "react";
import homeImage from "./whiteboard.png";
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
  language
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
    <div className="relative my-4">
                    {/* eslint-disable jsx-a11y/img-redundant-alt */}

      <img
        src={homeImage}
        alt="Image of Teacher learning Students over a computer"
        className="w-screen h-screen"
        onLoad={handleImageLoad}
      />
      {isImageLoaded && (
        <section className="center-section">

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center ">
          <h1 className="text-4xl font-bold text-black-500 mb-4">
            Scribble Sync
          </h1>
          {!isUserLoggedIn && <button
            className="bg-customLightOrange text-lg text-white py-2 px-4 rounded hover:bg-customOrange transform hover:scale-105 transition duration-300"
            onClick={handleLogin}
            aria-label={language === "English" ? "Get Logged In Today" : "Connectez-vous aujourd'hui"}
          >
            {language === "English" ? "Get Logged In Today" : "Connectez-vous aujourd'hui"}
          </button>}
        </div>
        </section>

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
