import React from 'react';
import Slider from 'react-slick';
import '../../../assets/css/user/landing/TopCard.css'; // Import the updated CSS file


const TopCard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="unique-topcard__container">
      <h2 className="unique-topcard__heading">TOP OFFERS AND DISCOUNTS</h2>
      <Slider {...settings}>
        <div className="unique-topcard__slide"><img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1722497873_mum.jpg?im=Resize=(768,448)" alt="Offer 1" /></div>
        <div className="unique-topcard__slide"><img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1722425744_riceatta.jpg?im=Resize=(768,448)" alt="Offer 2" /></div>
        <div className="unique-topcard__slide"><img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1722681127_Mumbai.jpg?im=Resize=(768,448)" alt="Offer 3" /></div>
        <div className="unique-topcard__slide"><img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1722582168_Milk_Maharastra-2.jpg?im=Resize=(768,448)" alt="Offer 4" /></div>
        <div className="unique-topcard__slide"><img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1722880435_OnePlus_Nord_CE3_Lite_5G.jpg?im=Resize=(768,448)" alt="Offer 5" /></div>
        <div className="unique-topcard__slide"><img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1721216850_Footwear_Top_Picks.jpg?im=Resize=(768,448)" alt="Offer 6" /></div>
        <div className="unique-topcard__slide"><img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1722335091_Best_Of_Kitchen_and_Home_Appliances_632x368.jpg?im=Resize=(768,448)" alt="Offer 7" /></div>
        <div className="unique-topcard__slide"><img src="https://www.jiomart.com/images/cms/aw_rbslider/slides/1722168803_Premium_Cloth_Drying_Stand.jpg?im=Resize=(768,448)" alt="Offer 8" /></div>
      </Slider>
    </div>
  );
};

export default TopCard;
