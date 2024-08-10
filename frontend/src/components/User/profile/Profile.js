import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../../assets/css/user/profile/Profile.css';
import { useAuth } from '../../contexts/AuthContext';

import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        addresses: []
    });
    const [activeSection, setActiveSection] = useState('details');
    const { userId, isloggedin, handleLogout } = useAuth();
    const navigate = useNavigate();



    const handle_Logout = () => {
        handleLogout();
        navigate('/login');
        toast.success('Logged out successfully!');
    };

    return (
        <div className="profile-container">
            <div className="profile-sidenav">
                <h2>Profile</h2>
                <ul>
                    <li onClick={() => setActiveSection('details')}>My Details</li>
                    <li onClick={() => setActiveSection('orders')}>Orders</li>
                    <li onClick={() => setActiveSection('wishlist')}>My Wishlist</li>
                    <li onClick={() => setActiveSection('notifications')}>Notifications</li>
                    <li onClick={handle_Logout}>Logout</li>
                </ul>
            </div>
            <div className="profile-content">
                {activeSection === 'details' && (
                    <div className="profile-details">
                        <h2>Personal Information</h2>
                        <p><strong>Email:</strong> {user.email} </p>
                        <p><strong>First Name:</strong> {user.firstName}</p>
                        <p><strong>Last Name:</strong> {user.lastName}</p>
                        <p><strong>Phone:</strong> {user.phone}</p>
                        {/* <h2>Addresses</h2>
                        {user.addresses.length > 0 ? (
                            user.addresses.map((address, index) => (
                                <div key={index} className="address-card">
                                    <p><strong>Street:</strong> {address.street}</p>
                                    <p><strong>City:</strong> {address.city}</p>
                                    <p><strong>State:</strong> {address.state}</p>
                                    <p><strong>Postal Code:</strong> {address.postalCode}</p>
                                    <p><strong>Country:</strong> {address.country}</p>
                                </div>
                            ))
                        ) : (
                            <p>No addresses available.</p>
                        )} */}
                        {/* <button onClick={() => navigate('/addaddress')}>Add Address</button> */}
                    </div>
                )}
                {activeSection === 'orders' && (
                    <div className="profile-orders">
                        <h2>My Orders</h2>
                        <p>Order history will be displayed here.</p>
                    </div>
                )}
                {activeSection === 'wishlist' && (
                    <div className="profile-wishlist">
                        <h2>My Wishlist</h2>
                        <p>Wishlist items will be displayed here.</p>
                    </div>
                )}
                {activeSection === 'notifications' && (
                    <div className="profile-notifications">
                        <h2>Notifications</h2>
                        <p>Notification settings will be displayed here.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
