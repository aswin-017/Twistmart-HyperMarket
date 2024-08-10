const db = require('../config/db');

// Link product to category
const linkProductToCategory = (req, res) => {
    const { product_id, category_id } = req.body;
    const query = `
        INSERT INTO ProductCategories (product_id, category_id)
        VALUES (?, ?)
    `;
    db.query(query, [product_id, category_id], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ success: true });
    });
};


module.exports = { linkProductToCategory };
