import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

import { FaTimes, FaCheck } from "react-icons/fa";

import logo from "./logo.png";
import axios from "axios";

function SignUpLoginPopup({
  isPopUpDisplayed,
  onLoginSuccess,
  setIsUserLoggedIn,
  teacherInfo,
  studentInfo,
  setTeacherInfo,
  setStudentInfo,
  setUserType,
  setCurrentPage,
}) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [showPopup, setShowPopup] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [welcomePopup, setWelcomePopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("http://localhost:3001/teachers");
      setTeachers(Object.values(result.data)[0]);
    };
    fetchData();
  }, []);

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let loggedInTeacher = null;

    teachers.forEach(function (element) {
      if (element.Email === emailValue && element.Password === passwordValue) {
        loggedInTeacher = element;
      }
    });

    if (loggedInTeacher) {
      setIsUserLoggedIn(true);
      setTeacherInfo(loggedInTeacher); // Update teacherInfo state
      setShowPopup(false);
      setWelcomePopup(true);
      setCurrentPage("MySchedulePage");
      setTimeout(() => {
        setWelcomePopup(false);
      }, 3000);
    } else {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <>
      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.popUp}>
            <div className={styles.row}>
              <button className={styles.closePopup} onClick={handleClosePopup}>
                <FaTimes />
              </button>
            </div>
            <h2 className={styles.subHeading}>Education. Learning. Fun.</h2>

            <h2 className={styles.subHeading}>
              Provide your email and password to login
            </h2>

            <form className={styles.emailForm} onSubmit={handleSubmit}>
              <label>
                <input
                  className={styles.input}
                  type="email"
                  value={emailValue}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  placeholder="Email"
                />
              </label>

              <label>
                <input
                  className={styles.input}
                  type="password"
                  value={passwordValue}
                  onChange={handlePasswordChange}
                  autoComplete="password"
                  placeholder="Password"
                />
              </label>

              <button className={styles.submitButton} type="submit">
                Submit
              </button>

              <h2>{errorMessage}</h2>
            </form>
          </div>
        </div>
      )}

      {welcomePopup && (
        <div className={styles.overlay}>
          <div className={styles.popUp}>
            <div className="flex flex-col items-center justify-center">
              <div className="text-6xl text-green-500">
                <FaCheck />
              </div>
              <h2 className="text-2xl font-bold mb-4">
                Welcome Back {teacherInfo.FirstName}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUpLoginPopup;
