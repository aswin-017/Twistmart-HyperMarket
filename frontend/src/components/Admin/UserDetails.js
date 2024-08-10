import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/css/admin/UserDetails.css';

const UserDetails = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch all users from the backend
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    

    const handleEdit = (userId) => {
        navigate(`/admin/edit-user/${userId}`);
    };

    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:5000/api/auth/${userId}`);
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div className="user-details-container">
            <h2>User Details</h2>
            <table className="user-details-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Email Verified</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.email}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.phone}</td>
                            <td>{user.email_verified ? 'Yes' : 'No'}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEdit(user.id)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserDetails;

