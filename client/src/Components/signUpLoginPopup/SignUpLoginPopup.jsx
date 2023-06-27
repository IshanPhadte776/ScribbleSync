import { useState } from "react";
import React from 'react'
import styles from "./styles.module.css";

import { FaTimes } from "react-icons/fa";


import logo from "./logo.png";

function SignUpLoginPopup() {

    const [usernameValue, setUsernameValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const [showPopup, setShowPopup] = useState(true);

    const handleClosePopup = () => {
      setShowPopup(false);
    };

  const handleUsernameChange = (event) => {
    setUsernameValue(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPasswordValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the form from submitting normally

  }

  return (
    <>
      {showPopup && (
        <div className={styles.overlay}>
          <div className={styles.popUp}>
            <div className={styles.row}>
              <img className={styles.logoImage} src={logo} alt="Logo" />
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
                  type="username"
                  value={usernameValue}
                  onChange={handleUsernameChange}
                  autoComplete="username"
                  placeholder="Username"
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
  
              <button className={styles.input} type="submit">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
  
};

export default SignUpLoginPopup