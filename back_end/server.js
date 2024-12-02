const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const argon2 = require('argon2');
const { body, validationResult } = require('express-validator');

const cors = require('cors');
app.use(cors());

const userModel = require('./models/user');
const employeeModel = require('./models/employee');

const PORT = process.env.PORT || 3001;

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB server connected successfully."))
.catch(err => console.error(`MongoDB connection error: ${err}`));

// User Management endpoints

// Create new user
router.post('/api/v1/user/signup', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            console.log('User already exists:', email);
            return res.status(400).send({ message: 'User already exists.' });
        }

        // Create new user
        const newUser = new userModel({
            username,
            email,
            password: await argon2.hash(password),  // Hash the password
        });
        await newUser.save();

        console.log('User created successfully:', newUser);
        res.status(201).send({ message: 'User created successfully.' });
    } catch (err) {
        console.error('Signup error:', err.message);
        res.status(500).send({ message: 'Server error' });
    }
});

// User login
router.post('/api/v1/user/login', async (req, res) => {
    const { email, password } = req.body;
    console.log('Login attempt for email:', email);

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).send({ message: 'User not found.' });
        }

        console.log('Stored hashed password in DB:', user.password);
        console.log('Plain text password for verification:', password);

        const isMatch = await argon2.verify(user.password, password);

        console.log('Password verification result:', isMatch);

        if (!isMatch) {
            console.log('Invalid password for user:', email);
            return res.status(401).send({ message: 'Invalid password.' });
        }

        console.log('Login successful for user:', email);
        res.status(200).send({ message: 'Login successful.' });
    } catch (err) {
        console.error('Login error:', err.message);
        res.status(500).send({ message: 'Server error' });
    }
});

// Employee Management endpoints

// Get all employees
router.get('/api/v1/emp/employees', async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const employees = await employeeModel.find({});

    if (employees.length === 0){
        res.status(404).send({
            status: false,
            message: "No employees found" 
        })
    } else {
        return res.status(200).json(employees);
    }

});

// Create new employee
router.post('/api/v1/emp/employees',
    [
        // Validation rules
        body('first_name').not().isEmpty().withMessage('Enter a valid first name'),
        body('last_name').not().isEmpty().withMessage('Enter a valid last name'),
        body('email').isEmail().withMessage('Enter a valid email.'),
        body('position').not().isEmpty().withMessage('Enter a valid position'),
        body('salary').isNumeric().withMessage('Enter a valid salary.'),
        body('department').not().isEmpty().withMessage('Enter a valid department'),
    ],
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { first_name, last_name, email, position, salary, department } = req.body;

        if (await employeeModel.findOne({ email })){
            return res.status(400).send({
                status: false,
                message: 'Employee already exists.'
            });
        }

        try {
            // Create new employee
            const employee = new employeeModel({
                first_name,
                last_name,
                email,
                position,
                salary,
                department
            });
            
            await employee.save();

            res.status(201).send({
                message: "Employee created successfully",
                employee: employee._id
            });
        } catch (err) {
            console.error(`An error occurred: ${err.message}`);
            res.status(500).send({
                status: false,
                message: "Server error. Please try again later."
            });
        }
    }
);

// Get an employee by ID
router.get('/api/v1/emp/employees/:eid', async (req, res) => {

    const eid = req.params.eid;

    const employee = await employeeModel.findById(eid);

    if (employee){
        return res.status(200).send({ employee });
    } else {
        return res.status(400).send({
            status: false,
            message: "Employee not found."
        });
    }
});

// Update employee detais
router.put('/api/v1/emp/employees/:eid',
    [
        // Validation rules
        body('first_name').optional().not().isEmpty().withMessage('First name cannot be empty.'),
        body('last_name').optional().not().isEmpty().withMessage('Last name cannot be empty.'),
        body('email').optional().isEmail().withMessage('Please enter a valid email.'),
        body('position').optional().not().isEmpty().withMessage('Position cannot be empty.'),
        body('salary').optional().isNumeric().withMessage('Salary must be a number.'),
        body('department').optional().not().isEmpty().withMessage('Department cannot be empty.')
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const eid = req.params.eid;

        const update = {};
        if (req.body.first_name) update.first_name = req.body.first_name;
        if (req.body.last_name) update.last_name = req.body.last_name;
        if (req.body.email) update.email = req.body.email;
        if (req.body.position) update.position = req.body.position;
        if (req.body.salary) update.salary = req.body.salary;
        if (req.body.department) update.department = req.body.department;

        const employee = await employeeModel.findByIdAndUpdate(eid, update);

        if (employee){
            res.status(200).send({ message: "Employee details updated successfully." });
        } else {
            res.status(400).send({
                status: false,
                message: "Unable to modify employee."
            });
        }
});

// Delete employee by ID
router.delete('/api/v1/emp/employees/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const employee = await employeeModel.findByIdAndDelete(id);
        if (!employee) {
            return res.status(404).send({ message: 'Employee not found' });
        }

        res.status(200).send({ message: 'Employee deleted successfully' });
    } catch (err) {
        console.error('Error deleting employee:', err.message);
        res.status(500).send({ message: 'Server error' });
    }
});

// Search for employee
router.get('/api/v1/emp/employees/search', async (req, res) => {
    const { query, searchType } = req.query;

    if (!query) {
        return res.status(400).json({ message: 'Query parameter is required' });
    }

    try {
        // Use dynamic search type
        const searchField = searchType === 'department' ? 'department' : 'position';
        const employees = await employeeModel.find({
            [searchField]: { $regex: query, $options: 'i' },
        });

        res.status(200).json(employees);
    } catch (err) {
        console.error(`Error fetching employees: ${err.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server listining on: http://localhost:${PORT}`);
});