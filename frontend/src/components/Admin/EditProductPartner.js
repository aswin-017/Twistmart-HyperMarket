import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/admin/EditProductPartner.css';

const EditProductPartner = () => {
    const { shopId } = useParams();
    const navigate = useNavigate();
    const [partner, setPartner] = useState({
        shop_id: '',
        shop_name: '',
        shop_description: '',
        shop_image: '',
        owner_id: ''
    });

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/shops/${shopId}`);
                setPartner(response.data);
            } catch (error) {
                console.error('Error fetching partner:', error);
            }
        };
        fetchPartner();
    }, [shopId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPartner(prevPartner => ({
            ...prevPartner,
            [name]: value
        }));
    };

    const handleSave = async () => {
        try {
            // Create a new object without `created_at` and `updated_at`
            const { created_at, updated_at, ...updateData } = partner;
            await axios.put(`http://localhost:5000/api/shops/${partner.shop_id}`, updateData);
            alert('Product partner details saved!');
            navigate('/admin/product-partners');
        } catch (error) {
            console.error('Error saving partner:', error);
        }
    };
     

    return (
        <div className="edit-product-partner-container">
            <h2>Edit Product Partner</h2>
            <form className="edit-product-partner-form">
                <div className="form-group">
                    <label htmlFor="shop_name">Shop Name:</label>
                    <input
                        type="text"
                        id="shop_name"
                        name="shop_name"
                        value={partner.shop_name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="shop_description">Description:</label>
                    <textarea
                        id="shop_description"
                        name="shop_description"
                        value={partner.shop_description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="shop_image">Image URL:</label>
                    <input
                        type="text"
                        id="shop_image"
                        name="shop_image"
                        value={partner.shop_image}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="owner_id">Owner ID:</label>
                    <input
                        type="number"
                        id="owner_id"
                        name="owner_id"
                        value={partner.owner_id}
                        onChange={handleChange}
                    />
                </div>
                <button type="button" className="save-button" onClick={handleSave}>Save</button>
            </form>
        </div>
    );
};

export default EditProductPartner;
