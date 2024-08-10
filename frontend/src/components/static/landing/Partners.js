import React from 'react';
import '../../../assets/css/static/Partners.css';

const ProfileCard = ({ image, name, role, description, socialLinks }) => {
  return (
    <figure className="snip1559">
      <div className="profile-image">
        <img src={image} alt={name} />
      </div>
      <figcaption>
        <h3>{name}</h3>
        <h5>{role}</h5>
        <p>{description}</p>
        <div className="icons">
          {socialLinks.map((link, index) => (
            <a href={link.href} key={index} target="_blank" rel="noopener noreferrer">
              <i className={`ion-social-${link.icon}`}></i>
            </a>
          ))}
        </div>
      </figcaption>
    </figure>
  );
};

const Partners = () => {
  const profiles = [
    {
      image: "https://www.imparalingleseconmonica.com/wp-content/uploads/2017/09/man-business-2-1.jpg",
      name: "Sue Shei",
      role: "Vakilsearch (Uber9 Business Process Services Pvt Ltd)",
      description: "We are delighted to serve TwsitMart sellers' in Tax, Compliances and other legal requirements. Hope this journey of togetherness would extend our businesses providing amazing offers to the sellers.",
      socialLinks: [
        { href: "#", icon: "reddit" },
        { href: "#", icon: "twitter" },
        { href: "#", icon: "vimeo" }
      ]
    },
    {
      image: "https://tse4.mm.bing.net/th?id=OIP.HcAGxORzdrCbRWAOPKvGKQHaLH&pid=Api&P=0&h=180",
      name: "Will Barrow",
      role: "Rapra Private Limited",
      description: "Being associated with TwistMart has made our work much easier! It's a great platform to gain knowledge and showcase our consulting skills to the sellers, proving them beneficial in every way.",
      socialLinks: [
        { href: "#", icon: "reddit" },
        { href: "#", icon: "twitter" },
        { href: "#", icon: "vimeo" }
      ]
    },
    {
      image: "https://c.pxhere.com/photos/1e/73/portrait_man_man_portrait_male_person_adult_face_caucasian-601668.jpg!d",
      name: "Indigo Violet",
      role: "FinTech",
      description: "Partnering with TwistMart has let us serve small businesses by offering them solutions related to tax and accounting services. With advance automation and technology, we are easing out their GST challenges.",
      socialLinks: [
        { href: "#", icon: "reddit" },
        { href: "#", icon: "twitter" },
        { href: "#", icon: "vimeo" }
      ]
    }
  ];

  return (
    <div className="profiles-container">
      <h2 className="profiles-heading">OUR SERVICE PARTNERS</h2>
      <div className="profiles-cards">
        {profiles.map((profile, index) => (
          <ProfileCard
            key={index}
            image={profile.image}
            name={profile.name}
            role={profile.role}
            description={profile.description}
            socialLinks={profile.socialLinks}
          />
        ))}
      </div>
    </div>
  );
};

export default Partners;
