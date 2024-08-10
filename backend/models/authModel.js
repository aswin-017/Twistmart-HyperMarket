const connection = require('../config/db');

// Create a new user
const createUser = (email, password, firstName, lastName, phone, callback) => {
    const query = `INSERT INTO Authenticated (email, password, first_name, last_name, phone) VALUES (?, ?, ?, ?, ?)`;
    connection.query(query, [email, password, firstName, lastName, phone], callback);
};

// Find a user by email
const findUserByEmail = (email, callback) => {
    const query = `SELECT * FROM Authenticated WHERE email = ?`;
    connection.query(query, [email], callback);
};

// Find a user by ID
const findUserById = (id, callback) => {
    const query = `SELECT * FROM Authenticated WHERE id = ?`;
    connection.query(query, [id], callback);
};

const updateUser = (id, userData, callback) => {
    const query = `UPDATE Authenticated SET email = ?, first_name = ?, last_name = ?, phone = ?, role = ? WHERE id = ?`;
    connection.query(query, [userData.email, userData.first_name, userData.last_name, userData.phone, userData.role, id], callback);
};

// Delete a user
const deleteUserFromDB = (id, callback) => {
    const query = `DELETE FROM Authenticated WHERE id = ?`;
    connection.query(query, [id], callback);
};

// Find all users
const findAllUsers = (callback) => {
    const query = `SELECT * FROM Authenticated`;
    connection.query(query, callback);
};

module.exports = { createUser, findUserByEmail, findUserById, updateUser, deleteUserFromDB, findAllUsers };
