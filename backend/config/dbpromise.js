const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Aswin@17',
    database: 'twistmart'
});

module.exports = connection;
