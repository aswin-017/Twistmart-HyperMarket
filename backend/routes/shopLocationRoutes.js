const express = require('express');
const router = express.Router();
const shopLocationController = require('../controllers/shopLocationController');

// Define routes
router.get('/', shopLocationController.getAllShopLocations);
router.get('/:shop_id', shopLocationController.getShopLocationsByShopId);
router.get('/:id', shopLocationController.getShopLocationById);
router.post('/', shopLocationController.createLocation);
router.put('/:id', shopLocationController.updateShopLocation);
router.delete('/:id', shopLocationController.deleteShopLocation);
router.put('/:shopId', shopLocationController.updateShopLocationsByShopId);

module.exports = router;
