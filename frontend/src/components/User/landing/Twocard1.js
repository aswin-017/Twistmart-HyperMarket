import React from 'react';
import '../../../assets/css/user/landing/TopCard.css'; // Import the updated CSS file



const Twocard1 = () => {
  const images = [
    'https://www.jiomart.com/images/cms/aw_rbslider/slides/1721317364_Ethnic_Styles.jpg?im=Resize=(768,200)',
    'https://www.jiomart.com/images/cms/aw_rbslider/slides/1720436283_beauty_632.jpg?im=Resize=(768,200)',
    'https://www.jiomart.com/images/cms/aw_rbslider/slides/1721912587_Dining.jpg?im=Resize=(768,200)',
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



export default Twocard1;
