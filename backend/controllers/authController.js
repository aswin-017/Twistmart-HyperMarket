const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');
const {
    createUser,
    findUserByEmail,

    updateUser,
    deleteUserFromDB,
    findAllUsers
} = require('../models/authModel');

// Sign up controller
const signUp = (req, res) => {
    const { email, password, firstName, lastName, phone } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) return res.status(500).json({ error: err });
        createUser(email, hashedPassword, firstName, lastName, phone, (err, result) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: 'User created successfully!' });
        });
    });
};

// Log in controller
const logIn = (req, res) => {
    const { email, password } = req.body;
    findUserByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid email or password' });

        const user = results[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: err });
            if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

            const token = jwt.sign(
                { id: user.id, role: user.role },
                'your_jwt_secret',
                { expiresIn: '1h' }
            );

            res.status(200).json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    phone: user.phone,
                    role: user.role
                }
            });
        });
    });
};

const getUserById = (req, res) => {
    const { id } = req.params;
    console.log(`Received request to fetch user with ID: ${id}`); // Debugging log

    // Directly implement the database query within this function
    const query = `SELECT * FROM Authenticated WHERE id = ?`;
    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Debugging log
            return res.status(500).json({ error: err.message });
        }
        console.log('Query results:', results); // Debugging log
        if (results.length === 0) {
            console.log('User not found'); // Debugging log
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(results[0]);
    });
};



const createProductPartner = async (req, res) => {
    const { email, password, firstName, lastName, phone } = req.body;

    if (!email || !password || !firstName || !lastName || !phone) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new product partner into database
        const insertQuery = `
            INSERT INTO authenticated (email, password, first_name, last_name, phone, role)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        connection.query(insertQuery, [email, hashedPassword, firstName, lastName, phone, 'PRODUCT_PARTNER'], (err, results) => {
            if (err) {
                console.error('Error inserting product partner:', err);
                return res.status(500).json({ success: false, message: 'Internal Server Error' });
            }

            // Return the ID of the newly created product partner
            const newProductPartnerId = results.insertId;
            res.status(201).json({ success: true, message: 'Product Partner created successfully', id: newProductPartnerId });
        });
    } catch (error) {
        console.error('Error creating product partner:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};



const editUser = (req, res) => {
    const { id } = req.params;
    const { email, first_name, last_name, phone, role } = req.body; // Match frontend attribute names

    updateUser(id, { email, first_name, last_name, phone, role }, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User updated successfully' });
    });
};


// Delete user controller
const deleteUserController = (req, res) => {
    const { id } = req.params;
    deleteUserFromDB(id, (err, result) => {
        if (err) return res.status(500).json({ error: err });
        if (result.affectedRows === 0) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ message: 'User deleted successfully' });
    });
};

// Get all users controller
const getAllUsers = (req, res) => {
    findAllUsers((err, results) => {
        if (err) return res.status(500).json({ error: err });
        res.status(200).json(results);
    });
};

module.exports = { signUp, logIn, getUserById, editUser, deleteUserController, getAllUsers,createProductPartner };
