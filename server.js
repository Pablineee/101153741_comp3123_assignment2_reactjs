require('dotenv').config();
const connectDB = require('./config/db');
const DiviV1Data = require('./models/DiviV1Data');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Route to get all Divi V1 data
app.get('/api/v1/data', async (req, res) => {
    try {
        const diviData = await DiviV1Data.find();
        res.status(200).json(diviData);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at: http://localhost:${PORT}`);
});