require('dotenv').config();
const mongoose = require('mongoose');

const mongoString = process.env.DB_URL;

// Ensure the connection is established before moving forward
const connectToDatabase = async () => {
    try {
        await mongoose.connect(mongoString, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to database');
    } catch (error) {
        console.error('Error connecting to database:', error);
        process.exit(1);
    }
};

module.exports = connectToDatabase;
