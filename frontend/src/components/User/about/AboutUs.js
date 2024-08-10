import React from 'react';

import '../../../assets/css/user/about/about.css'; // Ensure this path is correct
import Card3 from './card3';
import Card4 from './card4';


const AboutUs = () => {
  const image = 'https://www.bigbasket.com/media/uploads/banner_images/B2C071812062-23469-6aug24.jpg?tr=w-1920,q=80'
  return (
    <div className="about-us">
      <div className="about-image-container">
        <img src={image} alt="About Us" className="about-image" />
        <div className="overlay-content">
          <h1> Welcome to Twistmart,</h1>
          <h2>
            where innovation meets convenience in the world of hypermarket solutions. 
          </h2>
        </div>
      </div>
      <Card3/>
      <Card4 />  
      {/* <Footer/> */}
  

    </div>
  );
};

export default AboutUs;