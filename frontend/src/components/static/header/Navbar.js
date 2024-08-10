import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import '../../../assets/css/static/Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar-list">

            <>
              <li className="navbar-item">
                <NavLink to="/#services" className="navbar-link">
                  Business Opportunities
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/#works" className="navbar-link">
                  How It Works
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/#faq" className="navbar-link">
                  FAQs
                </NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/#contact" className="navbar-link">
                  Contact Us
                </NavLink>
              </li>
          <li className="navbar-item"><Link to="/products" className="navbar-link">Products</Link></li>

            </>
   
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
