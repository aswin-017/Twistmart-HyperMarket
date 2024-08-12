const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const shopRoutes = require('./routes/shopRoutes');
const productRoutes = require('./routes/productRoutes');
const shopLocationRoutes = require('./routes/shopLocationRoutes');
const partnerWithUsRoutes = require('./routes/partnerWithUsRoutes');
const routes = require('./routes/routes');
const emailRoutes = require('./routes/emailRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const addressRoutes = require('./routes/addressRoutes');
const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing

// Increase the limit for JSON and URL-encoded data
app.use(bodyParser.json({ limit: '10mb' })); // Increase the limit as needed
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' })); // Increase the limit as needed

app.use(cookieParser()); 
app.use('/api', cartRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/shops', shopRoutes);
app.use('/api/locations', shopLocationRoutes);
app.use('/api/partner-with-us', partnerWithUsRoutes); 
app.use('/api', routes);
app.use('/api/emails', emailRoutes);
app.use('/api', orderRoutes);
app.use('/api', addressRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
