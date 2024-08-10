const express = require('express');
const router = express.Router();
const partnerWithUsController = require('../controllers/partnerWithUsController');

// Route to handle form submission
router.post('/', partnerWithUsController.createPartnerRequest);

// Route to get all partner requests
router.get('/', partnerWithUsController.getAllPartnerRequests);

// Route to get a partner request by ID
router.get('/:id', partnerWithUsController.getPartnerRequestById);

// Route to update a partner request by ID
router.put('/:id', partnerWithUsController.updatePartnerRequestById); // Add this route

module.exports = router;
