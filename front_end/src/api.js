import axios from 'axios';

const API = process.env.REACT_APP_API_BASE_URL;

// Create an Axios instance
const api = axios.create({
    baseURL: API,
    timeout: 5000, // Timeout
});

// API call to retrieve all employees
export const getAllEmployees = () => api.get('/emp/employees');

// API call to create a new employee
export const createEmployee = (data) => api.post('/emp/employees', data);

// API call to create a new user
export const createUser = (data) => api.post('/user/signup', data);

// API call to login user
export const loginUser = (data) => api.post('/user/login', data);

// API call to update an existing employee
export const updateEmployee =(id, data) => api.put(`/emp/employees/${id}`, data);

// API call to delete existing employee
export const deleteEmployee = (id) => api.delete(`/emp/employees/${id}`);
