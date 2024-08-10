import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/admin/ApplicationsDetails.css';

const ApplicationsDetails = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/partner-with-us');
                setApplications(response.data.data);
            } catch (err) {
                setError('Error fetching data');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleApprove = (id) => {
        navigate(`/admin/approve/${id}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="applications-details-container">
            <h2>Applications Details</h2>
            <table className="applications-details-table">
                <thead>
                    <tr>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Shop Name</th>
                        <th>Shop Description</th>
                        <th>Shop Image</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Postal Code</th>
                        <th>Country</th>
                        <th>Contact Number</th>
                        <th>Approval Status</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map(app => (
                        <tr key={app.id}>
                            <td>{app.email}</td>
                            <td>{app.first_name}</td>
                            <td>{app.last_name}</td>
                            <td>{app.phone}</td>
                            <td>{app.role}</td>
                            <td>{app.shop_name}</td>
                            <td>{app.shop_description}</td>
                            <td>
                                {/* Display Base64 image */}
                                {app.shop_image ? (
                                    <img 
                                        src={app.shop_image}
                                        alt={app.shop_name} 
                                        className="applications-details-shop-image"
                                    />
                                ) : (
                                    <span>No Image</span>
                                )}
                            </td>
                            <td>{app.address}</td>
                            <td>{app.city}</td>
                            <td>{app.state}</td>
                            <td>{app.postal_code}</td>
                            <td>{app.country}</td>
                            <td>{app.contact_number}</td>
                            <td>
                                <button 
                                    className="applications-details-approve-button"
                                    onClick={() => handleApprove(app.id)}
                                >
                                    {app.isApproved ? 'Approved' : 'Approve'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicationsDetails;
