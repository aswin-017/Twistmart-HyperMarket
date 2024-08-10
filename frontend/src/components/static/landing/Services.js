import React from 'react';
import '../../../assets/css/static/Services.css';

const Card = ({ image, title, description, link }) => {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3 className="card-title">{title}</h3>
        <p className="card-description">{description}</p>
        {/* <a href={link} className="card-link">View More</a> */}
      </div>
    </div>
  );
};

const CardContainer = ({ cards }) => {
  return (
    <div className="card-container">
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          description={card.description}
          link={card.link}
        />
      ))}
    </div>
  );
};

const Services = () => {
  const cards = [
      
      {
        image: 'https://img.freepik.com/free-photo/business-woman-hand-typing-laptop-keyboard-with-financial-cha_1150-724.jpg?t=st=1722501964~exp=1722505564~hmac=a8030f8a455abd258378fa614c60769f71c769e232db9e1f00bf256095f0caf3&w=996',
        title: 'Account Management',
        description: 'Provide end-to-end services to a host of sellers. Help the sellers build a long term relationship with their customers.',
        link: '#'
      },
      {
        image: 'https://tse1.mm.bing.net/th?id=OIP.EULs-j9YCoNLtqW2LQATFAHaE7&pid=Api&P=0&h=180',
        title: 'Accounting',
        description: 'Provide payment reconciliation and integrated accounting services to sellers and help them with enhanced product profitability analysis',
        link: '#'
      },
      {
        image: 'https://img.freepik.com/premium-photo/digital-advertising-motivational-business-marketing-words-quotes-concept_21336-2640.jpg?w=996',
        title: 'Advertising',
        description: 'Lend your advertising services to sellers across the country. Help them promote their products and boost their sales.',
        link: '#'
      },
      {
        image: 'https://img.freepik.com/free-vector/gradient-product-catalog-template_23-2149877177.jpg?w=996&t=st=1722502164~exp=1722502764~hmac=fca3078e926d37907f03b0e7e0a811da46c4254e59fb161d7ff6f5c6f727676b',
        title: 'Catalog',
        description: 'Connect with a host of sellers and help them build an appealing catalogue with compelling content that attracts customers.',
        link: '#'
      },
      {
        image: 'https://images.pexels.com/photos/414781/pexels-photo-414781.jpeg?auto=compress&cs=tinysrgb&w=600',
        title: 'Imaging',
        description: 'Provide photoshoot and editing services to sellers across the country and help them boost their sales.',
        link: '#'
      },
      {
        image: 'https://img.freepik.com/free-photo/html-css-collage-concept-with-person_23-2150062008.jpg?w=996&t=st=1722505023~exp=1722505623~hmac=933cb31f5daa5639bec9f5f798eca1520230c5ea077b4eda5ebc475d2d9e91b5',
        title: 'Software Solutionss',
        description: 'Help sellers in reinstating their suspended accounts and ensure their accounts dont get suspended in future',
        link: '#'
      },
      {
        image: 'https://tse1.mm.bing.net/th?id=OIP.EULs-j9YCoNLtqW2LQATFAHaE7&pid=Api&P=0&h=180',
        title: 'Taxation',
        description: 'Connect with sellers across India and provide and lend them your assistance in filing taxes and handling money.',
        link: '#'
      },
      {
        image: 'https://img.freepik.com/free-photo/happy-entrepreneur-presenting-his-colleagues-new-business-strategy-whiteboard-during-meeting-office_637285-6984.jpg?w=996&t=st=1722504928~exp=1722505528~hmac=cabcf14020f2006204c6041fd2b6dbfc3ed93acc3d8ad3c8e8c68408335b9a96',
        title: 'Seller Trainig',
        description: 'Provide in-person classroom / online training to new sellers & recently onboarded sellers on how to manage and grow their business on Flipkar',
        link: '#'
      },
      {
        image: 'https://img.freepik.com/free-photo/businessman-touching-red-icon-connected_1232-176.jpg?w=1060&t=st=1722504980~exp=1722505580~hmac=aa62e90369a4f8eae9f497c46f6273c7f4b20142edefec77a6974292547a279f',
        title: 'Souring',
        description: 'Have a wide assortment of quality products to offer to the sellers? Connect with sellers across the country who need your services.',
        link: '#'
      },
      {
        image: 'https://tse3.mm.bing.net/th?id=OIP.qx-_KY9tZqxhuJ-V99EAvQHaE8&pid=Api&P=0&h=180',
        title: 'Onboarding',
        description: 'Discover software solutions to bring efficiency in your operations.',
        link: '#'
      },
   
    // Add more cards as needed
  ];

  return (
    <div className="SomeComponent">
      <h1 className="heading">SERVICES THAT YOU CAN PROVIDE</h1>
      <CardContainer cards={cards} />
    </div>
  );
};

export default Services;
