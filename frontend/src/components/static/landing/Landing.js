import React from 'react';
import {Link} from 'react-router-dom';
import '../../../assets/css/static/Landing.css'; // Adjust the path if needed


const Landing = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <h1>Its time to make a difference and grow your business!</h1>
        <p>Offer Professional Services To 2 Lakh+ Sellers In India.</p>
        <Link to="partner-with-us">
        <button className="cta-button">Partner With Us </button>
        </Link>
      </div>
      {/* <ServicesPage /> */}


    </div>
  );
};

export default Landing;
