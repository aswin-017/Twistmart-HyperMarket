const ShopLocation = require('../models/shopLocationModel');
const db = require('../config/db');

// Get all shop locations
const getAllShopLocations = (req, res) => {
    ShopLocation.getAllShopLocations((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

const connection = require('../config/db'); // Import database connection

// Function to get shop locations by shop_id
const getShopLocationsByShopId = (req, res) => {
    const shopId = req.params.shop_id;
    console.log(`Fetching locations for shop ID: ${shopId}`); // Log the shopId

    const query = 'SELECT * FROM ShopLocations WHERE shop_id = ?';
    
    db.query(query, [shopId], (err, results) => {
        if (err) {
            console.error('Error fetching shop locations:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'No locations found for this shop' });
        }
        res.status(200).json(results);
    });
};

module.exports = {
    getShopLocationsByShopId
};


const getShopLocationById = (req, res) => {
    const locationId = req.params.id;

    const query = 'SELECT * FROM ShopLocations WHERE location_id = ?';
    
    db.query(query, [locationId], (err, results) => {
        if (err) {
            console.error('Error fetching shop location:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Shop location not found' });
        }
        res.status(200).json(results[0]);
    });
};

const createLocation = (req, res) => {
    const { shop_id, address, city, state, postal_code, country, contact_number } = req.body;
    
    if (!shop_id || !address || !city || !state || !postal_code || !country || !contact_number) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const query = 'INSERT INTO shoplocations (shop_id, address, city, state, postal_code, country, contact_number) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const values = [shop_id, address, city, state, postal_code, country, contact_number];
    
    db.query(query, values, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Location created successfully', locationId: results.insertId });
    });
};

// Update a shop location
const updateShopLocation = (req, res) => {
    const locationId = req.params.id;
    const shopLocationData = req.body;
    ShopLocation.updateShopLocation(locationId, shopLocationData, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Shop location not found' });
        res.status(200).json({ message: 'Shop location updated successfully' });
    });
};

// Delete a shop location
const deleteShopLocation = (req, res) => {
    const locationId = req.params.id;
    ShopLocation.deleteShopLocation(locationId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Shop location not found' });
        res.status(200).json({ message: 'Shop location deleted successfully' });
    });
};

const updateShopLocationsByShopId = (req, res) => {
    const shopId = req.params.shopId;
    const shopLocationData = req.body;

    ShopLocationModel.updateShopLocationsByShopId(shopId, shopLocationData, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'No locations found for this shop' });
        res.status(200).json({ message: 'Shop locations updated successfully' });
    });
};




module.exports = {
    getAllShopLocations,
    getShopLocationsByShopId,
    getShopLocationById,
    createLocation,
    updateShopLocation,
    deleteShopLocation,
    updateShopLocationsByShopId
};
