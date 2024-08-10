const express = require('express');
const router = express.Router();
const { signUp, logIn, getUserById, editUser, deleteUserController, getAllUsers,createProductPartner } = require('../controllers/authController');

// Sign up route
router.post('/signup', signUp);

// Log in route
router.post('/login', logIn);

router.post('/create-product-partner', createProductPartner);

// Get user by ID route
router.get('/:id', getUserById);

// Edit user route
router.put('/:id', editUser);

// Delete user route
router.delete('/:id', deleteUserController);

// Get all users route
router.get('/', getAllUsers);

module.exports = router;
