import {React,useState} from 'react'
import styles from './Headerstyles.css'

function Header({ scrollToAboutMe, scrollToPaintings, scrollToInstagramFeed }) {

    const [showPopup, setShowPopup] = useState(false);

    const handleNewsletterClick = () => {
      setShowPopup((prevShowPopup) => !prevShowPopup);
    };
  
    const handleAboutMeClick = () => {
      scrollToAboutMe();
    };
  
    const handlePaintingsClick = () => {
      scrollToPaintings();
    };
  
    const handleInstagramFeedClick = () => {
      scrollToInstagramFeed();
    };


  return (
    <div className={styles.header}>
      <div className={styles.row}>
        <div className={styles.logoAndName}>
          <h1 className={styles.brandName}> School-O-Board</h1>
        </div>

        <h2 className={styles.subHeading} onClick={handleAboutMeClick}>
          Home
        </h2>
        <h2 className={styles.subHeading} onClick={handlePaintingsClick}>
          
          About Us
        </h2>
        <h2 className={styles.subHeading} onClick={handleInstagramFeedClick}> Pricing </h2>
        <h2 className={styles.subHeading} onClick={handleNewsletterClick}>
          Login
        </h2>

        <h2 className={styles.subHeading} onClick={handleNewsletterClick}>
          Sign Up
        </h2>
      </div>
    </div>
  )
}

export default Header