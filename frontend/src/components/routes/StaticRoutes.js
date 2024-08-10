import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { scroller } from 'react-scroll';
import Header from '../static/header/Header';
import Home from '../static/landing/Home';
import Login from '../auth/Login';
import SignUp from '../auth/SignUp';
import PartnerForm from '../static/PartnerForm';
import ProductList from '../static/products/ProductList';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      scroller.scrollTo(hash.substring(1), {
        smooth: true,
        duration: 500,
        offset: -80, // adjust this value based on your navbar height
      });
    }
  }, [pathname, hash]);

  return null;
};

const StaticRoutes = () => {
  return (
    <>
      <Header />
      <ScrollToTop /> 
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/partner-with-us" element={<PartnerForm />} />
          <Route path="/products" element={<ProductList />} />
          
        </Routes>
      </div>
    </>
  );
};

export default StaticRoutes;
