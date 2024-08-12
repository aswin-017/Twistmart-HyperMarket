import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaCheckCircle } from 'react-icons/fa'; // Import icon
import { toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import '../../assets/css/admin/ApprovePage.css';

const ApprovePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isApproved, setIsApproved] = useState(false);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/partner-with-us/${id}`);
                setApplication(response.data.data);
                setIsApproved(response.data.data.isApproved);
            } catch (err) {
                setError(err.message || 'Error fetching application details');
                console.error('Error fetching data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id]);

    const handleApprove = async () => {
        if (isApproved) return;

        try {
            const response = await axios.get(`http://localhost:5000/api/partner-with-us/${id}`);
            const application = response.data.data;

            const {
                email, password, first_name, last_name, phone,
                shop_name, shop_description, shop_image,
                address, city, state, postal_code, country, contact_number
            } = application;

            // Ensure shop_image is Base64 encoded
            const shopImageBase64 = shop_image; 

            // Create the product partner
            const productPartnerResponse = await axios.post('http://localhost:5000/api/auth/create-product-partner', {
                email, password, firstName: first_name, lastName: last_name, phone
            });

            const ownerId = productPartnerResponse.data.id;

            // Create the shop
            const shopResponse = await axios.post('http://localhost:5000/api/shops', {
                shopName: shop_name,
                shopDescription: shop_description,
                shopImage: shopImageBase64,
                owner_id: ownerId
            });

            const shopId = shopResponse.data.shopId;

            // Create the shop location
            await axios.post('http://localhost:5000/api/locations', {
                shop_id: shopId,
                address, city, state, postal_code, country, contact_number
            });

            // Send the welcome email
            await axios.post('http://localhost:5000/api/emails/send-welcome-email', { email, password });
            await axios.put(`http://localhost:5000/api/partner-with-us/${id}`, { isApproved: true });

            setIsApproved(true);
            toast.success(`Application with ID: ${id} has been approved and all data has been processed!`);
            navigate('/admin/applications-details');
        } catch (err) {
            toast.error('Error approving application');
            console.error('Error approving application:', err);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="approve-page-container">
            <h2>Approve Application</h2>
            <table className="approve-page-table">
                <tbody>
                    <tr>
                        <th>Email</th>
                        <td>{application.email}</td>
                    </tr>
                    <tr>
                        <th>First Name</th>
                        <td>{application.first_name}</td>
                    </tr>
                    <tr>
                        <th>Last Name</th>
                        <td>{application.last_name}</td>
                    </tr>
                    <tr>
                        <th>Phone</th>
                        <td>{application.phone}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>{application.role}</td>
                    </tr>
                    <tr>
                        <th>Shop Name</th>
                        <td>{application.shop_name}</td>
                    </tr>
                    <tr>
                        <th>Shop Description</th>
                        <td>{application.shop_description}</td>
                    </tr>
                    <tr>
                        <th>Shop Image</th>
                        <td>
                            {application.shop_image ? (
                                <img 
                                    src={application.shop_image}
                                    alt={application.shop_name} 
                                    className="approve-page-shop-image" 
                                />
                            ) : 'No Image'}
                        </td>
                    </tr>
                    <tr>
                        <th>Address</th>
                        <td>{application.address}</td>
                    </tr>
                    <tr>
                        <th>City</th>
                        <td>{application.city}</td>
                    </tr>
                    <tr>
                        <th>State</th>
                        <td>{application.state}</td>
                    </tr>
                    <tr>
                        <th>Postal Code</th>
                        <td>{application.postal_code}</td>
                    </tr>
                    <tr>
                        <th>Country</th>
                        <td>{application.country}</td>
                    </tr>
                    <tr>
                        <th>Contact Number</th>
                        <td>{application.contact_number}</td>
                    </tr>
                </tbody>
            </table>
            <button
                className={`approve-page-approve-button ${isApproved ? 'approved' : ''}`}
                onClick={handleApprove}
                disabled={isApproved}
                style={{ cursor: isApproved ? 'not-allowed' : 'pointer' }}
            >
                <FaCheckCircle 
                    className="approve-icon"
                    title={isApproved ? 'Already Approved' : 'Approve'}
                />
                {isApproved ? 'Approved' : 'Approve'}
            </button>
        </div>
    );
};

export default ApprovePage;
