const db = require('../config/db');

const getAllShops = (callback) => {
    const query = 'SELECT * FROM Shops';
    db.query(query, callback);
};

const getShopById = (shopId, callback) => {
    const query = 'SELECT * FROM Shops WHERE shop_id = ?';
    db.query(query, [shopId], callback);
};

const createShop = (shopData, callback) => {
    const query = 'INSERT INTO Shops SET ?';
    db.query(query, shopData, callback);
};


const updateShop = (shopId, shopData, callback) => {
    const { created_at, updated_at, ...updateFields } = shopData;
    const query = 'UPDATE Shops SET ? WHERE shop_id = ?';
    db.query(query, [updateFields, shopId], callback);
};

const deleteShop = (shopId, callback) => {
    const query = 'DELETE FROM Shops WHERE shop_id = ?';
    db.query(query, [shopId], callback);
};

module.exports = {
    getAllShops,
    getShopById,
    createShop,
    updateShop,
    deleteShop
};
