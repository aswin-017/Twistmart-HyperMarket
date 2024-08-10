const db = require('../config/db');

// Get all shop locations
const getAllShopLocations = (callback) => {
    const query = 'SELECT * FROM ShopLocations';
    db.query(query, callback);
};

// Get shop locations by shop_id
const getShopLocationsByShopId = (shopId, callback) => {
    const query = 'SELECT * FROM ShopLocations WHERE shop_id = ?';
    db.query(query, [shopId], callback);
};

// Get a shop location by location_id
const getShopLocationById = (locationId, callback) => {
    const query = 'SELECT * FROM ShopLocations WHERE location_id = ?';
    db.query(query, [locationId], callback);
};

// Create a new shop location
const createShopLocation = (shopLocationData, callback) => {
    const query = 'INSERT INTO ShopLocations SET ?';
    db.query(query, shopLocationData, callback);
};

// Update a shop location
const updateShopLocation = (locationId, shopLocationData, callback) => {
    const query = 'UPDATE ShopLocations SET ? WHERE location_id = ?';
    db.query(query, [shopLocationData, locationId], callback);
};

// Delete a shop location
const deleteShopLocation = (locationId, callback) => {
    const query = 'DELETE FROM ShopLocations WHERE location_id = ?';
    db.query(query, [locationId], callback);
};
const updateShopLocationsByShopId = (shopId, shopLocationData, callback) => {
    // Assuming you want to update all locations for a shop.
    const query = 'UPDATE ShopLocations SET ? WHERE shop_id = ?';
    db.query(query, [shopLocationData, shopId], callback);
};

module.exports = {
    getAllShopLocations,
    getShopLocationsByShopId,
    getShopLocationById,
    createShopLocation,
    updateShopLocation,
    deleteShopLocation,
    updateShopLocationsByShopId
};
