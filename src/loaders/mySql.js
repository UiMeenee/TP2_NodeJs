const mysql = require('mysql2');

// MySQL database credentials
const config = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'my-secret-pw',
    database: 'afc_richmond',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

// Create a MySQL connection
const connection = mysql.createConnection(config);

// Handle connection errors
connection.connect((err) => {
    if (err) {
        console.error(`Error connecting to the database: ${err.stack}`);
        process.exit(1);
    } else {
        console.log('Connected to database with ID:', connection.threadId);
    }
});

// Export the connection
module.exports = connection;