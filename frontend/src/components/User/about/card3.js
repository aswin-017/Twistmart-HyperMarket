import React, { useState, useEffect } from 'react';
import '../../../assets/css/user/about/card3.css';

const Carousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const items = [
    { 
      src: "https://images.pexels.com/photos/6995138/pexels-photo-6995138.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1", 
      header: "Who We Are", 
      paragraph: "Twistmart is dedicated to providing fast and sustainable delivery services. We combine rapid delivery with a commitment to environmental responsibility, ensuring that products reach you quickly while minimizing our impact on the planet. Experience the future of delivery with Twistmart—where speed and sustainability go hand in hand."
    },
    { 
      src: "https://img.freepik.com/free-vector/businessman-looking-camera-target-it-s-like-business-looking-way-be-successful-vector-business-illustration-concept_1150-60931.jpg?t=st=1721987915~exp=1721991515~hmac=dd8941af90858c7dabe4cc0e1b10334834f8af3d4921895c7eee47cac0f51bde&w=1060", 
      header: "Our Vision", 
      paragraph: "At Twistmart, our vision is to revolutionize the delivery landscape by providing a seamless and efficient supply chain solution tailored to your needs. With cutting-edge technology and a robust infrastructure, we operate state-of-the-art warehouses, a fleet of thousands of trucks, and numerous fulfillment and sortation centers." 
    },
    { 
      src: "https://img.freepik.com/free-vector/gradient-core-values-background_23-2149081659.jpg?t=st=1722007836~exp=1722011436~hmac=0e015a7fd6651cf2b5ef48c2dc2f23183499a99ae8f309f7b8ea7dab3c5a0cf8&w=996",
      header: "Our Values", 
      paragraph: "At Twistmart, our Product Partner module values integrity, innovation, and collaboration. We ensure honesty and transparency in all dealings, drive progress with cutting-edge solutions, and foster strong, supportive partnerships to achieve mutual success." 
    }
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? items.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    // Function to automatically move to the next slide after 5 seconds
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex === items.length - 1 ? 0 : prevIndex + 1));
    }, 1500); // Change 5000 to adjust the interval (in milliseconds)

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [items.length]); // Dependency array ensures effect runs when items length changes

  return (
    <div className="carousel">
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div
            key={index}
            className={`carousel-item ${activeIndex === index ? 'active' : ''}`}
          >
            <div className="carousel-content">
              <img className="carousel-image" src={item.src} alt={`Slide ${index + 1}`} />
              <div className="carousel-description">
                <h2 className="carousel-header">{item.header}</h2>
                <p className="carousel-paragraph">{item.paragraph}</p>
              </div>
            </div>
          </div>
        ))}
        <button className="carousel-control prev" onClick={handlePrev}>‹</button>
        <button className="carousel-control next" onClick={handleNext}>›</button>
        <ol className="carousel-indicators">
          {items.map((_, index) => (
            <li key={index}>
              <button
                className={`carousel-bullet ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleDotClick(index)}
              >
                •
              </button>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Carousel;
