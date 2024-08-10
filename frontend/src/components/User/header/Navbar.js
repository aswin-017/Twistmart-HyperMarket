import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import '../../../assets/css/user/header/Navbar.css';

const categories = [
  { id: 1, name: 'Fruits & Vegetables', path: '/user/products?category=1' },
  { id: 2, name: 'Food Grains, Oil & Masala', path: '/user/products?category=2' },
  { id: 3, name: 'Beauty & Hygiene', path: '/user/products?category=3' },
  { id: 4, name: 'Appliances & Furnitures', path: '/user/products?category=4' },
  { id: 5, name: 'Snacks & Beverages', path: '/user/products?category=5' }
];

const Navbar = () => {
  const { isLoggedIn, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleDropdownOpen = () => {
    setDropdownIsOpen(true);
  };

  const handleDropdownClose = () => {
    setDropdownIsOpen(false);
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <ul className="navbar-list">
          {categories.map(category => (
            <li key={category.id} className="navbar-item">
              <Link to={category.path} className="navbar-link">{category.name}</Link>
            </li>
          ))}
          {/* All Categories Link */}
          <li className="navbar-item">
            <Link to="/user/allcategories" className="navbar-link">All Categories</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
