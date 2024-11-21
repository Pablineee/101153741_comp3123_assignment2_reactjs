import axios from 'axios';

// Base URL fetched from environment variables
const API = process.env.REACT_APP_API_BASE_URL;

// Create an Axios instance
const api = axios.create({
    baseURL: API,
    timeout: 5000, // Timeout (optional)
});

// API call to get Divi data
export const getDivi = () => api.get('/divi');

// API call to create a new Divi data entry
export const createDivi = (data) => api.post('/divi', data);

// API call to update an existing Divi data entry
export const updateDivi =(id, data) => api.put(`/divi/${id}`, data);

// API call to delete existing Divi data entry
export const deleteDivi = (id) => api.delete(`/divi/${id}`);