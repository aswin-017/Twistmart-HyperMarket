const express = require('express');
const router = express.Router();
const addressController = require('../controllers/addressController');

// Route to add a new address
router.post('/addresses', addressController.addAddress);

// Route to get addresses by user ID
router.get('/addresses/:userId', addressController.getAddressesByUserId);

module.exports = router;
