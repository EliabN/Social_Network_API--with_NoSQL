// Connection
// The Mongoose module's default connection.
const { connect, connection } = require('mongoose');

// Opens Mongoose's default connection to MongoDB
connect('mongodb://127.0.0.1:27017/usersPosts');

// Export
module.exports = connection;
