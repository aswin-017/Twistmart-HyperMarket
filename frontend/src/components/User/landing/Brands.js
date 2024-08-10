import React from 'react';
import '../../../assets/css/user/landing/Brands.css'; // Import the updated CSS file

// Sample image URLs
const images = [
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1719719924_Daawat.jpg?im=Resize=(368,452)',
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1719719981_Surf_excel.jpg?im=Resize=(368,452)',
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1719720036_Oneplus.jpg?im=Resize=(368,452)',
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1721911944_Bajaj.jpg?im=Resize=(368,452)',
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1722113942_Skybags.jpg?im=Resize=(368,452)',
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1722504446_Janasya.jpg?im=Resize=(368,452)',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
  'https://via.placeholder.com/150',
];

const Brands = () => {
  return (
    <div className="distinct-brands__container">
      <h2 className="distinct-brands__heading">TRENDING PRODUCTS</h2>
      <div className="distinct-brands__cards">
        {images.slice(0, 6).map((image, index) => (
          <div key={index} className="distinct-brands__card">
            <img src={image} alt={`Brand ${index + 1}`} className="distinct-brands__image" />
          </div>
        ))}
      </div>
      <h2 className="distinct-brands__secondary-heading">POPULAR BRANDS</h2>
    </div>
  );
};

export default Brands;
