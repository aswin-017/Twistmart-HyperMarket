import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/admin/Location.css'; // Regular stylesheet

const Location = () => {
    const { shopId } = useParams();
    const [location, setLocation] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/locations/${shopId}`);
                setLocation(response.data[0]); // Assuming you get an array of locations, use the first one
            } catch (err) {
                setError('Error fetching location data');
                console.error('Error fetching location:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchLocation();
    }, [shopId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="location-container">
            <h2>Location Details for Shop ID: {shopId}</h2>
            <div className="location-details">
                <div className="location-info">
                    <div className="location-item">
                        <strong>Address:</strong> {location?.address || 'N/A'}
                    </div>
                    <div className="location-item">
                        <strong>City:</strong> {location?.city || 'N/A'}
                    </div>
                    <div className="location-item">
                        <strong>State:</strong> {location?.state || 'N/A'}
                    </div>
                    <div className="location-item">
                        <strong>Postal Code:</strong> {location?.postal_code || 'N/A'}
                    </div>
                    <div className="location-item">
                        <strong>Country:</strong> {location?.country || 'N/A'}
                    </div>
                    <div className="location-item">
                        <strong>Contact Number:</strong> {location?.contact_number || 'N/A'}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Location;
