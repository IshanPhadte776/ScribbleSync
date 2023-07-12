import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";

import { FaTimes, FaCheck } from "react-icons/fa";

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
  userType,
}) {
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [showPopup, setShowPopup] = useState(true);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [welcomePopup, setWelcomePopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://whiteboard-application-final.onrender.com/teachers");
        const teachersData = Object.values(result.data)[0];

        if (teachersData.length === 0) {
          setErrorMessage("No teachers found");
        } else {
          setErrorMessage("");
          setTeachers(teachersData);
        }
      } catch (error) {
        setErrorMessage(
          "Teachers need a break, couldn't get Teachers in the Database"
        );
        console.error("Failed to Fetch teacher data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get("https://whiteboard-application-final.onrender.com/students");
        const studentsData = Object.values(result.data)[0];

        if (studentsData.length === 0) {
          setErrorMessage("No students found");
        } else {
          setErrorMessage("");
          setStudents(studentsData);
        }
      } catch (error) {
        setErrorMessage(
          "Students are out for recess, couldn't get Students in the Database"
        );
        console.error("Failed to fetch student data:", error);
      }
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
    let loggedInStudent = null;

    teachers.forEach(function (element) {
      if (element.Email === emailValue && element.Password === passwordValue) {
        loggedInTeacher = element;
      }
    });

    students.forEach(function (element) {
      if (
        element.FirstName === emailValue &&
        element.Password === passwordValue
      ) {
        loggedInStudent = element;
      }
    });

    if (loggedInTeacher) {
      setIsUserLoggedIn(true);
      setTeacherInfo(loggedInTeacher); // Update teacherInfo state
      setUserType("Teacher");
      setShowPopup(false);
      setWelcomePopup(true);
      setCurrentPage("MySchedulePage");
      setTimeout(() => {
        setWelcomePopup(false);
      }, 3000);
    } else if (loggedInStudent) {
      setIsUserLoggedIn(true);
      setStudentInfo(loggedInStudent); // Update studentInfo state
      setUserType("Student");
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
              Provide your email (Teachers) or first name (students) and
              password to login
            </h2>

            <form className={styles.emailForm} onSubmit={handleSubmit}>
              <label>
                <input
                  className={styles.input}
                  type="text"
                  value={emailValue}
                  onChange={handleEmailChange}
                  autoComplete="email"
                  placeholder="First Name or Email"
                  required // Add the 'required' attribute to enforce non-empty value
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
                  required // Add the 'required' attribute to enforce non-empty value
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
                Welcome Back{" "}
                {userType === "Teacher"
                  ? teacherInfo.FirstName
                  : studentInfo.FirstName}
              </h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SignUpLoginPopup;
