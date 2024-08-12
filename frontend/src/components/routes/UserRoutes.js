import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Header from '../User/header/Header';
import Profile from '../User/profile/Profile';
import AboutUs from '../User/about/AboutUs';
import ProductList from '../User/product/ProductList';
import ProductDetails from '../User/product/ProductDetails';
import ContactForm from '../User/contact/ContactForm';
import Cart from '../User/cart/Cart';
import Checkout from '../User/cart/Checkout';
import Landing from '../User/landing/LandingPage';
import Footer from '../static/landing/Footer';
import AllCategories from '../User/product/AllCategories';
import Address from '../User/profile/Address';

const UserRoutes = () => {
  const { isLoggedIn, userRole } = React.useContext(AuthContext);

  if (!isLoggedIn || userRole !== 'USER') {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:name" element={<ProductDetails />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-address/:userId" element={<Address />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/allcategories" element={<AllCategories />} />
          <Route path="*" element={<Navigate to="/" />} />
          {/* Add more user-specific routes here */}
        </Routes>
        <Footer />
      </div>
    </>
  );
};

export default UserRoutes;
