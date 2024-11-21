const mongoose = require('mongoose');

// Define a schema for the data
const diviV1Schema = new mongoose.Schema({
    Date: String,
    BuildUpSpeed_Home: Number,
    BuildUpSpeed_Away: Number,
    DefensivePressure_Home: Number,
    DefensivePressure_Away: Number,
    Over_Odds: Number,
    Under_Odds: Number,
    B365H: Number,
    B365D: Number,
    B365A: Number,
    Predicted_Outcome: Number,
    Match_Details: String,
    Actual_Result: Number,
    "Success Rate": String
});

// Export model
module.exports = mongoose.model('DiviV1Data', diviV1Schema, 'divi_v1');