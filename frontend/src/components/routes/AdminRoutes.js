import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../Admin/Sidebar';
import UserDetails from '../Admin/UserDetails';
import EditUserDetails from '../Admin/EditUserDetails';
import ProductPartner from '../Admin/ProductPartner';
import Location from '../Admin/Location';
import EditProductPartner from '../Admin/EditProductPartner';
import ApplicationsDetails from '../Admin/ApplicationsDetails';
import ApprovePage from '../Admin/ApprovePage';
import Dashboard from '../Admin/Dashboard/Dashboard';
import OrderDetails from '../Admin/OrderDetails';



const AdminRoutes = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div className="content1">
                <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/user-details" element={<UserDetails />} />
                    <Route path="/edit-user/:id" element={<EditUserDetails />} />
                    <Route path="/product-partners" element={<ProductPartner />} />
                    <Route path="/location/:shopId" element={<Location />} />
                    <Route path="/edit-product-partner/:shopId" element={<EditProductPartner />} />
                    <Route path="/order-details" element={<OrderDetails/>} />
                    <Route path="/settings" element={<div>You are in the admin settings module</div>} />
                    <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                    <Route path="/applications-details" element={<ApplicationsDetails />} />
                    <Route path="/approve/:id" element={<ApprovePage />} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminRoutes;
