import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaTrash, FaMapMarkerAlt } from 'react-icons/fa'; // Import icons
import '../../assets/css/admin/ProductPartner.css';

const ProductPartner = () => {
    const navigate = useNavigate();
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/shops');
                setPartners(response.data);
            } catch (error) {
                console.error('Error fetching partners:', error);
            }
        };
        fetchPartners();
    }, []);

    const handleEdit = (shopId) => {
        navigate(`/admin/edit-product-partner/${shopId}`);
    };

    const handleDelete = async (shopId) => {
        try {
            await axios.delete(`http://localhost:5000/api/shops/${shopId}`);
            setPartners(partners.filter(partner => partner.shop_id !== shopId));
        } catch (error) {
            console.error('Error deleting partner:', error);
        }
    };

    const handleGetLocation = (shopId) => {
        navigate(`/admin/location/${shopId}`);
    };

    return (
        <div className="product-partner-container">
            <h2 className="product-partner-title">Product Partners</h2>
            <table className="product-partner-table">
                <thead>
                    <tr>
                        <th>Shop ID</th>
                        <th>Shop Name</th>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Owner ID</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {partners.map(partner => (
                        <tr key={partner.shop_id}>
                            <td>{partner.shop_id}</td>
                            <td>{partner.shop_name}</td>
                            <td>{partner.shop_description}</td>
                            <td>
                                <img src={partner.shop_image} alt={partner.shop_name} className="product-partner-shop-image" />
                            </td>
                            <td>{partner.owner_id}</td>
                            <td className="actions-cell">
                                <FaEdit 
                                    className="action-icon edit-icon" 
                                    onClick={() => handleEdit(partner.shop_id)} 
                                    title="Edit"
                                />
                                <FaTrash 
                                    className="action-icon delete-icon" 
                                    onClick={() => handleDelete(partner.shop_id)} 
                                    title="Delete"
                                />
                                <FaMapMarkerAlt 
                                    className="action-icon" 
                                    onClick={() => handleGetLocation(partner.shop_id)} 
                                    title="Get Location"
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductPartner;
