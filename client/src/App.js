// import "./App.css";
import "./styles/tailwind.css";

import io from "socket.io-client";
import { useEffect, useState } from "react";
// import SignUpForm from "./Components/SignUpForm";
// import LoginForm from "./Components/LoginForm";
import Container from "./Components/container/Container";
import SignUpLoginPopup from "./Components/signUpLoginPopup/SignUpLoginPopup";
import Header from "./Components/header/Header";
import Chat from "./Components/Chat";
import AboutUS from "./Components/aboutUs/AboutUsPage";
import RegisterPage from "./Components/register/RegisterPage";
import AboutUsPage from "./Components/aboutUs/AboutUsPage";
import MySchedulePage from "./Components/mySchedule/MySchedulePage";
import MyImagesPage from "./Components/myImages/MyImagesPage";
import Home from "./Components/home/Home";

function App() {
  const [currentPage, setCurrentPage] = useState("HomePage");

  const [teacherInfo, setTeacherInfo] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    Pronouns: "",
    NumOfStudents: "",
    ClassName: "",
  });

  const [studentInfo, setStudentInfo] = useState({
    FirstName: "",
    LastName: "",
    Password: "",
    ClassName: "",
  });

  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);

  const [userType, setUserType] = useState("null");

  const handleNavigation = (page) => {
    setCurrentPage(page);
  };

  const handleLoginSuccess = (info) => {
    if (info.ClassName) {
      setTeacherInfo(info);
      setIsUserLoggedIn(true);
      setUserType("teacher");
    } else if (info.FirstName) {
      setStudentInfo(info);
      setIsUserLoggedIn(true);
      setUserType("student");
    }
  };

  return (
    <div className="App">
      <Header
        isUserLoggedIn={isUserLoggedIn}
        teacherInfo={teacherInfo}
        studentInfo={studentInfo}
        handleNavigation={handleNavigation}
        onLoginSuccess={handleLoginSuccess}
        setIsUserLoggedIn={setIsUserLoggedIn}
        setTeacherInfo={setTeacherInfo}
        setStudentInfo={setStudentInfo}
        setUserType={setUserType}

      ></Header>

      {currentPage === "HomePage" && <Home />}
      {currentPage === "AboutUsPage" && <AboutUsPage />}
      {currentPage === "RegisterPage" && <RegisterPage />}
      {currentPage === "MySchedulePage" && <MySchedulePage />}
      {currentPage === "MyImagesPage" && <MyImagesPage />}

      <Chat> </Chat>
    </div>
  );
}

export default App;
