import React, { useState } from 'react';
import '../../../assets/css/user/landing/NavBar.css'; // Import the updated CSS file


const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="unique-navbar">
      <ul className="unique-navbar-menu">
        <li className="unique-navbar-item unique-dropdown">
          <a href="#" onClick={toggleDropdown}>
            Fruits & Vegetables
          </a>
          {dropdownOpen && (
            <div className="unique-dropdown-menu">
              <a href="#">Organic Fruits & Vegetables</a>
              <a href="#">Exotic Fruits & Vegetables</a>
              <a href="#">Herbs & Seasoning</a>
              <a href="#">Spinach</a>
            </div>
          )}
        </li>
        <li className="unique-navbar-item unique-dropdown">
          <a href="#" onClick={toggleDropdown}>
            Food Grains, Oil & Masala
          </a>
          {dropdownOpen && (
            <div className="unique-dropdown-menu">
              <a href="#">Edible Oils & Ghee</a>
              <a href="#">Masalas & Spices</a>
              <a href="#">Dals & Pulses</a>
              <a href="#">Sugar, Salt & Jaggery</a>
              <a href="#">Dry Fruits</a>
            </div>
          )}
        </li>
        <li className="unique-navbar-item unique-dropdown">
          <a href="#" onClick={toggleDropdown}>
            Beauty & Hygiene
          </a>
          {dropdownOpen && (
            <div className="unique-dropdown-menu">
              <a href="#">Hair Care</a>
              <a href="#">Skin Care</a>
              <a href="#">Oral Care</a>
              <a href="#">Health & Medicine</a>
              <a href="#">Feminine Hygiene</a>
            </div>
          )}
        </li>
        <li className="unique-navbar-item unique-dropdown">
          <a href="#" onClick={toggleDropdown}>
            Appliances
          </a>
          {dropdownOpen && (
            <div className="unique-dropdown-menu">
              <a href="#">Cooking Appliances</a>
              <a href="#">Beverage & Food Prep</a>
              <a href="#">Cleaning & Laundry</a>
              <a href="#">Cooling & Air Treatment</a>
              <a href="#">Miscellaneous</a>
            </div>
          )}
        </li>
        <li className="unique-navbar-item unique-dropdown">
          <a href="#" onClick={toggleDropdown}>
            Snacks & Branded Foods
          </a>
          {dropdownOpen && (
            <div className="unique-dropdown-menu">
              <a href="#">Chocolates & Candies</a>
              <a href="#">Noodles, Pasta & Vermicelli</a>
              <a href="#">Spreads, Sauces & Ketchup</a>
              <a href="#">Tomato Ketchup & Sauces</a>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
