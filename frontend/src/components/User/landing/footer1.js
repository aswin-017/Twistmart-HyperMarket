// Footer.js
import React from 'react';
import '../../../assets/css/user/landing/footer1.css'; // Import the updated CSS file

// Import the CSS file

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>All Categories</h4>
          <ul>
            <li>Grocery</li>
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home & Kitchen</li>
            <li>Premium Fruits</li>
            <li>Books</li>
            <li>Furniture</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Popular Categories</h4>
          <ul>
            <li>Staples</li>
            <li>Beverages</li>
            <li>Personal Care</li>
            <li>Home Care</li>
            <li>Fruits & Vegetables</li>
            <li>Baby Care</li>
            <li>Snacks & Branded Foods</li>
            <li>Dairy & Bakery</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Customer Account</h4>
          <ul>
            <li>My Account</li>
            <li>My Orders</li>
            <li>Wishlist</li>
            <li>Payment Methods</li>
            <li>Delivery Addresses</li>
            <li>JioMart Wallet</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Help & Support</h4>
          <ul>
            <li>About Us</li>
            <li>FAQ</li>
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>E-waste Policy</li>
            <li>Cancellation & Return Policy</li>
            <li>Shipping & Delivery Policy</li>
            <li>AC Installation by resQ</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>WhatsApp us: 70003 70003</p>
          <p>Call us: 1800 890 1222</p>
          <p>8:00 AM to 8:00 PM, 365 days</p>
          <p>Should you encounter any bugs, glitches, lack of functionality, delayed deliveries, billing errors or other problems on the website, please email us on <a href="mailto:cs@jiomart.com">TwistMart@gmail.com</a></p>
          <div className="download-section">
            <h4>Download the app</h4>
            <a href="#download">
            <img src="https://www.jiomart.com/assets/ds2web/jds-icons/ios_app_icon.svg" alt="Download on Google Play" className="download-icon" />
              <img src="https://www.jiomart.com/assets/ds2web/jds-icons/google-play-icon.svg" alt="Download on Google Play" className="download-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
