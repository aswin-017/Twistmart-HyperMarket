import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../assets/css/Address.css'; // Make sure to create this CSS file
import { useAuth } from './context/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Address = () => {
  const { userId } = useAuth(); // Use useAuth to get userId
  const navigate = useNavigate(); // Initialize useNavigate
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleSaveAddress = async (e) => {
    e.preventDefault();
    try {
      // Replace with your backend API URL
      const response = await fetch(`http://localhost:8080/api/addresses/user/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          street,
          city,
          state,
          postalCode,
          country,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save address');
      }

      const data = await response.json();
      toast.success('Address saved successfully!');
      
      // Redirect to profile page after saving address
      navigate('/profile');
    } catch (error) {
      toast.error('Failed to save address.');
    }
  };

  return (
    <div className="address-container">
      <button className="back-to-profile" onClick={() => navigate('/profile')}>
        Back to Profile
      </button>
      <div className="address-box">
        <h2>Enter Address</h2>
        <form onSubmit={handleSaveAddress}>
          <div className="address-input-group">
            <label htmlFor="street">Street</label>
            <input
              type="text"
              id="street"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </div>
          <div className="address-input-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="address-input-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </div>
          <div className="address-input-group">
            <label htmlFor="postalCode">Postal Code</label>
            <input
              type="text"
              id="postalCode"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>
          <div className="address-input-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="address-submit-button">Save Address</button>
        </form>
      </div>
    </div>
  );
};

export default Address;
