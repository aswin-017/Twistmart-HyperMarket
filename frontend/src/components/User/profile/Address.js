import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../contexts/AuthContext'; // Import useAuth
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "../../../assets/css/user/profile/Address.css";


const Address = () => {
  const { userId } = useAuth(); // Use useAuth to get userId
  const navigate = useNavigate(); // Initialize useNavigate
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const handleSaveAddress = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    try {
      const response = await fetch('http://localhost:5000/api/addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          street,
          city,
          state,
          postalCode,
          country,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success('Address added successfully!');
        navigate('/user/profile'); // Redirect to profile page after successful save
      } else {
        toast.error(`Failed to add address: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred while saving the address.');
    }
  };

  return (
    <div className="address-container">
      <button className="back-to-profile" onClick={() => navigate('/user/profile')}>
        Back
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
