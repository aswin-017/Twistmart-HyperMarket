const connection = require('../config/db'); // Import database connection

// Function to create a new partner request
const createPartnerRequest = (req, res) => {
  console.log('Received data:', req.body); // Log received data

  try {
    const { email, password, firstName, lastName, phone, shopName, shopDescription, shopImage, address, city, state, postalCode, country, contactNumber } = req.body;

    // Default values for role and isApproved
    const role = 'PRODUCT_PARTNER';
    const isApproved = 0;

    // Create a new partner request
    const query = `
      INSERT INTO partner_with_us (email, password, first_name, last_name, phone, role, shop_name, shop_description, shop_image, address, city, state, postal_code, country, contact_number, isApproved)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.query(query, [
      email,
      password,
      firstName,
      lastName,
      phone,
      role,
      shopName,
      shopDescription,
      shopImage, // Base64 image string
      address,
      city,
      state,
      postalCode,
      country,
      contactNumber,
      isApproved
    ], (err, results) => {
      if (err) {
        console.error('Error creating partner request:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
      res.status(201).json({ success: true, data: results });
    });
  } catch (error) {
    console.error('Error creating partner request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Function to get all partner requests
const getAllPartnerRequests = (req, res) => {
  try {
    const query = 'SELECT * FROM partner_with_us';

    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching partner requests:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
      res.status(200).json({ success: true, data: results });
    });
  } catch (error) {
    console.error('Error fetching partner requests:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// Function to get a partner request by ID
const getPartnerRequestById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  
  if (isNaN(id)) {
    return res.status(400).json({ success: false, message: 'Invalid ID format' });
  }
  
  try {
    const query = 'SELECT * FROM partner_with_us WHERE id = ?';

    connection.query(query, [id], (err, results) => {
      if (err) {
        console.error('Error fetching partner request:', err);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
      }
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'Partner request not found' });
      }
      res.status(200).json({ success: true, data: results[0] });
    });
  } catch (error) {
    console.error('Error fetching partner request:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
// Function to update a partner request by ID
const updatePartnerRequestById = (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { isApproved } = req.body;
  
    if (isNaN(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID format' });
    }
  
    if (typeof isApproved !== 'boolean') {
      return res.status(400).json({ success: false, message: 'Invalid approval status' });
    }
  
    try {
      const query = 'UPDATE partner_with_us SET isApproved = ? WHERE id = ?';
  
      connection.query(query, [isApproved, id], (err, results) => {
        if (err) {
          console.error('Error updating partner request:', err);
          return res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ success: false, message: 'Partner request not found' });
        }
        res.status(200).json({ success: true, message: 'Partner request updated successfully' });
      });
    } catch (error) {
      console.error('Error updating partner request:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    createPartnerRequest,
    getAllPartnerRequests,
    getPartnerRequestById,
    updatePartnerRequestById // Export the new function
  };
  

