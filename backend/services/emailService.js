// services/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

/**
 * Send an email to the product partner
 * @param {string} recipient - Email address of the recipient
 * @param {string} password - Password for the recipient
 * @returns {Promise} - Promise resolving to the result of the email sending operation
 */
const sendWelcomeEmail = (recipient, password) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient,
        subject: 'Welcome to Twistmart-HyperMarket!',
        text: `You are successfully registered as the product partner. You can access our product partner portal with your registered email and password. Thank you!\n\nEmail: ${recipient}\nPassword: ${password}`
    };

    return transporter.sendMail(mailOptions)
        .then(info => {
            console.log('Email sent: ' + info.response);
            return info; // Ensure that the promise resolves with the info object
        })
        .catch(error => {
            console.error('Error sending email:', error); // Log detailed error information
            throw error; // Rethrow the error for handling in the route
        });
};

module.exports = { sendWelcomeEmail };

