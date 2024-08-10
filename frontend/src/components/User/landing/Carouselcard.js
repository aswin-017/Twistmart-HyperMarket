import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../../assets/css/user/landing/Carouselcard.css'; // Import the updated CSS file


const CarouselCard = () => {
  const settings = {
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 520,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const partners = [
    'https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Natures.jpg',
    'https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Dlecta.jpg',
    'https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Tea-culture.jpg',
    'https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/The-Whole-Truth.jpg',
    'https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Fiorenza.jpg',
    'https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Prasuma.jpg',
    'https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/London-Dairy.jpg',
    'https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Home-Delight.jpg',
    'https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/Wingreens.jpg',
    'https://gnbdevcdn.s3.ap-southeast-1.amazonaws.com/+Marketing/ShopByBrandImages/epigamia.jpg',
  ];

  return (
    <div className="unique-carousel__wrapper">
      <h2 className="unique-carousel__heading">NEW ARRIVALS</h2>
      <section className="unique-carousel__container">
        <Slider {...settings}>
          {partners.map((partner, index) => (
            <div className="unique-carousel__slide" key={index}>
              <img src={partner} alt={`Partner ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </section>
    </div>
  );
};

export default CarouselCard;
