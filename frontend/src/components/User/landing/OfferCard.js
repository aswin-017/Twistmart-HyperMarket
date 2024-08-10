import React from 'react';
import '../../../assets/css/user/landing/OfferCard.css'; // Import the updated CSS file


const OfferCard = () => {
  return (
    <div className="unique-card__container">
      <div className="unique-card__row">
        <div className="unique-card__column">
          <div className="unique-card__item">
            <img 
              src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1722449121_ENGLISH_DESKTOP.jpg?im=Resize=(2368,400)" 
              className="unique-card__image" 
              alt="Image" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
