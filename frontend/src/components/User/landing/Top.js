import React from 'react';

import '../../../assets/css/user/landing/Top.css'; // Import the updated CSS file


// Sample image URLs
const imageUrls = [
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1719764818_Smartphones.jpg?im=Resize=(368,538)',
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1721297032_Smart_Televisions.jpg?im=Resize=(368,538)',
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1721909353_Small_Appliances.jpg?im=Resize=(368,538)',
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1719764935_Mens_Fashion.jpg?im=Resize=(368,538)',
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1719764923_Womens_Fashion.jpg?im=Resize=(368,538)',
  'https://www.jiomart.com/images/cms/aw_rbslider/slides/1719765501_Kids_Fashion.jpg?im=Resize=(368,538)',
];

const Top = () => {
  return (
    <div className="unique-top__container">
      <h2 className="unique-top__heading">SHOP FROM TOP CATEGORIES</h2>
      <div className="unique-top__row">
        {imageUrls.slice(0, 6).map((url, index) => (
          <div key={index} className="unique-top__item">
            <img src={url} alt={`Top Card ${index + 1}`} className="unique-top__image" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top;
