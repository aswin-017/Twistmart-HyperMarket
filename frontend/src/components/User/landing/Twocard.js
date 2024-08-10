import React from 'react';
import '../../../assets/css/user/landing/TopCard.css'; // Import the updated CSS file



const Twocard = () => {
  const images = [
    
    'https://www.jiomart.com/images/cms/aw_rbslider/slides/1722936014_6321.jpg?im=Resize=(768,200)',
    'https://www.jiomart.com/images/cms/aw_rbslider/slides/1720160738_HealthCare.jpg?im=Resize=(768,200)',
    'https://www.jiomart.com/images/cms/aw_rbslider/slides/1722936048_632.jpg?im=Resize=(768,200)',
    // Add more image URLs as needed
  ];

  return (
    <div className="card-grid">
      {images.map((imgSrc, index) => (
        <div key={index} className="card1">
          <img src={imgSrc} alt={`Card ${index + 1}`} className="card-image" />
        </div>
      ))}
    </div>
  );
};



export default Twocard;
