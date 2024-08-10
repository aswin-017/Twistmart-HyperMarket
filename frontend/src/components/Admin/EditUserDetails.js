import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/admin/EditUserDetails.css'; // CSS file for styling

const EditUserDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: '',
        email: '',
        first_name: '',
        last_name: '',
        phone: '',
        email_verified: false,
        role: 'USER'
    });

    useEffect(() => {
        // Fetch the user data based on the ID
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/${id}`);
                setUser(response.data);
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };
        fetchUser();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/auth/${user.id}`, {
                email: user.email,
                first_name: user.first_name, // Ensure this matches the backend expectation
                last_name: user.last_name,   // Ensure this matches the backend expectation
                phone: user.phone,
                email_verified: user.email_verified,
                role: user.role
            });
            alert('User details saved!');
            navigate('/admin/user-details');
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };
    

    return (
        <div className="edit-user-container">
            <h2>Edit User Details</h2>
            <form className="edit-user-form">
                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} />

                <label>First Name:</label>
                <input type="text" name="first_name" value={user.first_name} onChange={handleChange} />

                <label>Last Name:</label>
                <input type="text" name="last_name" value={user.last_name} onChange={handleChange} />

                <label>Phone:</label>
                <input type="text" name="phone" value={user.phone} onChange={handleChange} />

                <label>Email Verified:</label>
                <select name="email_verified" value={user.email_verified} onChange={handleChange}>
                    <option value={true}>Yes</option>
                    <option value={false}>No</option>
                </select>

                <label>Role:</label>
                <select name="role" value={user.role} onChange={handleChange}>
                    <option value="USER">User</option>
                    <option value="PRODUCT_PARTNER">Product Partner</option>
                    <option value="ADMIN">Admin</option>
                </select>

                <div className="buttons">
                    <button type="button" onClick={handleSave}>Save</button>
                    <button type="button" onClick={() => navigate('/admin/user-details')}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default EditUserDetails;
