import React from 'react';
import '../../../assets/css/user/landing/OfferCard.css'; // Import the updated CSS file


const OfferCard1 = () => {
  return (
    <div className="unique-card__container">
      <div className="unique-card__row">
        <div className="unique-card__column">
          <div className="unique-card__item">
            <img 
              src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1713435737_Global_Store_2368x400.jpg?im=Resize=(2368,400)" 
              className="unique-card__image" 
              alt="Image" 
            />
          </div>
        </div>
      </div>
      <div className="unique-card__row">
        <div className="unique-card__column">
          <div className="unique-card__item">
            <img 
              src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1714050495_DailyMandi_1184x200.jpg?im=Resize=(2368,400)" 
              className="unique-card__image" 
              alt="Image" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default  OfferCard1;
