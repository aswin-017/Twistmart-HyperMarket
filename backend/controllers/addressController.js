const db = require('../config/db');

// Add a new address
exports.addAddress = (req, res) => {
    const { userId, street, city, state, postalCode, country } = req.body;
    const query = 'INSERT INTO addresses (user_id, street, city, state, postal_code, country) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [userId, street, city, state, postalCode, country], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.status(201).json({ success: true, data: results.insertId });
    });
};

// Get addresses by user ID
exports.getAddressesByUserId = (req, res) => {
    const userId = req.params.userId;
    const query = 'SELECT * FROM addresses WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: err.message });
        }
        res.status(200).json({ success: true, data: results });
    });
};
