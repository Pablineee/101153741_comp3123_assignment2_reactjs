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

/////////////////////////////// Divi V1 Endpoints ///////////////////////////////

// Route to get all Divi V1 data
app.get('/api/v1/divi', async (req, res) => {
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

// Route to retrieve data entry by ID
app.get('/api/v1/divi/:id', async (req, res) => {
    try {
        const data = await DiviV1Data.findById(req.params.id);

        if (!data) {
            res.status(404).json({ message: 'Data not found' });
        }

        res.status(200).json(data);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({ message: 'An error occurred'});
    }
});

// Route to input new data entry
app.post('/api/v1/divi', async (req, res) => {
    try {
        const newData = new DiviV1Data(req.body);
        const saved = await newData.save();

        if (!saved) {
            res.status(404).json({ message: 'Unable to create new entry' });
        }

        res.status(201).json(saved);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            message: 'An error occurred',
            error: error.message
        });
    }
});

// Route to update existing data entry
app.put('/api/v1/divi/:id', async (req, res) => {
    try {
        const updatedData = await DiviV1Data.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedData) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(updatedData);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.send(json({
            message: "An error occurred",
            error: error.message
        }));
    }
});

// Route to delete existing data entry
app.delete('/api/v1/divi/:id', async (req, res) => {
    try {
        const toDelete = await DiviV1Data.findByIdAndDelete(req.params.id);
        if (!toDelete) {
            res.status(404).json({ message: 'Data not found' });
        }
    } catch (error) {
        console.error(`Error: ${error.message}`);
        res.status(500).json({
            message: `An error occurred`,
            error: error.message
        });
    }
});

//////////////////////////////////// END ////////////////////////////////////

// Start the server
app.listen(PORT, () => {
    console.log(`Server listening at: http://localhost:${PORT}`);
});