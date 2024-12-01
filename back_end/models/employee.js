const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    position: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    salary: {
        type: Number,
        default: 0,
        validate(value){
            if (value < 0) throw new Error("Salary cannot be a negative value.");
        }
    },
    date_of_joining: {
        type: Date
    },
    department: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Employee = mongoose.model("Employee", EmployeeSchema);
module.exports = Employee;