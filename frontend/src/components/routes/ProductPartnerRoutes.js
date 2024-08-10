import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../ProductPartner/Sidebar';
import Dashboard from '../Admin/Dashboard/Dashboard';
import ProductDetails from '../ProductPartner/ProductDetails';
import ManageProduct from '../ProductPartner/ManageProduct';
import AddProduct from '../ProductPartner/AddProduct';


const ProductPartnerRoutes = () => {

    return (
        <>
            <Sidebar />
            <div className="content1">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/product-details" element={<ProductDetails/>} />
                    <Route path="/add-product" element={<AddProduct/>} />
                    <Route path="/manage-product/:id" element={<ManageProduct/>} />
                    <Route path="/manage-orders" element={<div>You are in the manage orders module</div>} />
                    <Route path="/settings" element={<div>You are in the settings module</div>} />
                    <Route path="*" element={<Navigate to="/product_partner/dashboard" />} />
                </Routes>
            </div>
        </>
    );
};

export default ProductPartnerRoutes;
