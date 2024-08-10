const Shop = require('../models/shopModel');
const db = require('../config/db');

const getAllShops = (req, res) => {
    Shop.getAllShops((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
};

const getShopById = (req, res) => {
    const shopId = req.params.id;
    Shop.getShopById(shopId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Shop not found' });
        res.status(200).json(results[0]);
    });
};

const createShop = (req, res) => {
    const { shopName, shopDescription, shopImage, owner_id } = req.body;

    if (!shopName || !owner_id) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // If shopImage is not provided, default to 'default.jpg'
    const image = shopImage || 'default.jpg';

    const query = 'INSERT INTO Shops (shop_name, shop_description, shop_image, owner_id) VALUES (?, ?, ?, ?)';
    const values = [shopName, shopDescription, image, owner_id];

    db.query(query, values, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Shop created successfully', shopId: results.insertId });
    });
};

// Get shop ID by owner ID
const getShopIdByOwnerId = (req, res) => {
    const ownerId = parseInt(req.params.owner_id, 10);
    if (isNaN(ownerId)) {
        return res.status(400).json({ message: 'Invalid owner ID' });
    }
    const query = 'SELECT shop_id FROM Shops WHERE owner_id = ?';
    db.query(query, [ownerId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Shop not found for this owner' });
        res.status(200).json({ shop_id: results[0].shop_id });
    });
}; 
const updateShop = (req, res) => {
    const shopId = req.params.id;
    const shopData = req.body;

    Shop.updateShop(shopId, shopData, (err, results) => {
        if (err) {
            console.error('Error updating shop:', err);
            return res.status(500).json({ error: err.message });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Shop not found' });
        }
        res.status(200).json({ message: 'Shop updated successfully' });
    });
};


const deleteShop = (req, res) => {
    const shopId = req.params.id;
    Shop.deleteShop(shopId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Shop not found' });
        res.status(200).json({ message: 'Shop deleted successfully' });
    });
};

module.exports = {
    getAllShops,
    getShopById,
    createShop,
    updateShop,
    deleteShop,
    getShopIdByOwnerId
};
