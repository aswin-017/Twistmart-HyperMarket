import React from 'react';
import { Element } from 'react-scroll';
import LandingPage from './Landing';
import Services from './Services';
import Works from './Works';
import Partners from './Partners';
import FAQ from './FAQ';
import ContactUs from './ContactUs';
import Footer from './Footer';
import '../../../assets/css/static/Home.css';

const Home = () => {
  return (
    <div className='home-container'>
      <LandingPage />
      <Element name="services">
        <div className="section-padding">
          <Services />
        </div>
      </Element>
      <Element name="works">
        <div className="section-padding">
          <Works />
        </div>
      </Element>
      <div className="section-padding">
        <Partners />
      </div>
      <Element name="faq">
        <div className="section-padding">
          <FAQ />
        </div>
      </Element>
      <Element name="contact">
        <div className="section-padding">
          <ContactUs />
        </div>
      </Element>
      <Footer />
    </div>
  );
};

export default Home;
