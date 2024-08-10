import React, { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Navbar from './Navbar';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import ToggleTheme from '../../ToggleTheme';
import '../../../assets/css/user/header/Header.css';
import logo from '../../../assets/images/logo.png'; 

const Header = () => {
  const {  firstName, lastName } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleProfileClick = () => {

      navigate('/user/profile');

  };

  const handleCartClick = () => {

      navigate('/user/cart');
   

  };

  // Calculate total items in cart
  // const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="header">
      <div className="header-left">
      <Link to="/user">
            <img src={logo} alt="TWISTMART Logo" className="company-logo" /> {/* Use the logo image */}
          </Link>
        </div>
        <div className="header-center">
          {/* <div className="search-box f_flex">
            <i className="fa fa-search"></i>
            <input type="text" placeholder="Search and hit enter..." />
            <span>All Categories</span>
          </div> */}
        </div>
        <div className="header-right">
          <ToggleTheme />
    
            <>
              <button className="profile-icon" onClick={handleProfileClick}>
                <i className="fa fa-user"></i> {`${firstName} ${lastName}`}
              </button>
              <button className="cart-button" onClick={handleCartClick}>
                <i className="fa fa-shopping-cart"></i> Cart 
              </button>
            </>

        </div>
      </header>
      <Navbar />
    </>
  );
};

export default Header;
