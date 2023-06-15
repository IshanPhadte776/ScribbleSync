import { useState } from "react";
import React from 'react'
import styles from "./styles.module.css";

import { FaTimes } from "react-icons/fa";


import logo from "./logo.png";

function SignUpLogin(props) {

    const [emailValue, setEmailValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [message, setMessage] = useState("");

    const [popUpScreen, setPopUpScreen] = useState(props.screen);

    const [showPopup, setShowPopup] = useState(true);

    const handleClosePopup = () => {
      setShowPopup(false);
    };


  

  //Starts with one or more characters that are not whitespace or @ (^[^\s@]+)
  // Followed by @ symbol (@)
  // Followed by one or more characters that are not whitespace or @ ([^\s@]+)
  // Followed by a dot (\.)
  // Followed by one or more characters that are not whitespace or @ ([^\s@]+)
  // Ends with the end of the string ($)
  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (event) => {
    setEmailValue(event.target.value);
  };

  const handleNameChange = (event) => {
    setNameValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent the form from submitting normally

  }





  return (
    <>
    {showPopup && ( <div className={styles.overlay}>
    <div className={styles.popUp}>
      <div className={styles.row}>
        <h1 className={styles.title}>Subscribe to the Newsletter</h1>
        <img className = {styles.logoImage}src={logo} alt="Logo" />
        <button className = {styles.closePopup} onClick={handleClosePopup}>
          <FaTimes />
        </button>
      </div>
      <h2 className={styles.subHeading}>Education. Learning. Fun.</h2>

      {popUpScreen == "Login" && (<h2 className={styles.subHeading}>
        Provide your email and password to login
      </h2>)}

      {popUpScreen == "SignUp" && (<h2 className={styles.subHeading}>
        Provide your email and password to sign up
      </h2>)}

      <form className={styles.emailForm} onSubmit={handleSubmit}>

      <label>
          <input className= {styles.input}
            type="email"
            value={emailValue}
            onChange={handleEmailChange}
            autoComplete="email"
            placeholder="Email"
          />
        </label>


        <label>
          <input className= {styles.input}
            type="password"
            value={nameValue}
            onChange={handleNameChange}
            autoComplete="password"
            placeholder="Password"
          />
        </label>



        <button className= {styles.input} type="submit">Submit</button>
      </form>
    </div>
  </div>
    )}
   </>
  );
};

export default SignUpLogin