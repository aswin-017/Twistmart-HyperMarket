// routes/emailRoutes.js
const express = require('express');
const router = express.Router();
const { sendWelcomeEmail } = require('../services/emailService');

router.post('/send-welcome-email', async (req, res) => {
    const { email, password } = req.body;

    try {
        await sendWelcomeEmail(email, password);
        res.status(200).json({ message: 'Welcome email sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
