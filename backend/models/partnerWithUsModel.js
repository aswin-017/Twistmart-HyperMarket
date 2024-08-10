const connection = require('../config/db');

// Function to create a new partner request
const createPartnerRequest = (partnerData, callback) => {
    const query = `
        INSERT INTO PartnerWithUs (email, password, firstName, lastName, phone, role, shopName, shopDescription, shopImage, address, city, state, postalCode, country, contactNumber, isApproved)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, [
        partnerData.email,
        partnerData.password,
        partnerData.firstName,
        partnerData.lastName,
        partnerData.phone,
        partnerData.role,
        partnerData.shopName,
        partnerData.shopDescription,
        partnerData.shopImage,
        partnerData.address,
        partnerData.city,
        partnerData.state,
        partnerData.postalCode,
        partnerData.country,
        partnerData.contactNumber,
        partnerData.isApproved
    ], (err, results) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, results);
    });
};

module.exports = {
    createPartnerRequest
};
