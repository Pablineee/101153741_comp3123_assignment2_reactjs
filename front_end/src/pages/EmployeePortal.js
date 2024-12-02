import React, { useState, useEffect } from 'react';
import { getAllEmployees, createEmployee, deleteEmployee, updateEmployee } from '../api';
import { useNavigate } from 'react-router-dom';

const EmployeePortal = () => {
    const [employees, setEmployees] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        department: '',
    });
    const [selectedEmployee, setSelectedEmployee] = useState(null); // For viewing details
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Fetch employees on component load
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await getAllEmployees();
                setEmployees(response.data);
            } catch (err) {
                setError('Failed to fetch employees');
                setTimeout(() => setError(''), 3000);
            }
        };
        fetchEmployees();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Create a new employee
    const handleCreateEmployee = async (e) => {
        e.preventDefault();
        try {
            const response = await createEmployee(formData); // Make API call to create the employee
            setEmployees((prev) => [...prev, response.data]); // Update local state with the new employee
            setShowForm(false); // Close the form
            setFormData({
                first_name: '',
                last_name: '',
                email: '',
                position: '',
                salary: '',
                department: '',
            }); // Reset the form fields
        } catch (err) {
            console.error('Failed to create employee:', err);
            setError('Failed to create employee');
            setTimeout(() => setError(''), 3000); // Clear error message after 3 seconds
        }
    };
    

    // Delete an employee
    const handleDeleteEmployee = async (id) => {
        try {
            await deleteEmployee(id);
            setEmployees((prev) => prev.filter((emp) => emp._id !== id));
        } catch (err) {
            setError('Failed to delete employee');
            setTimeout(() => setError(''), 3000);
        }
    };

    // Update an employee
    const handleUpdateEmployee = (employee) => {
        setFormData(employee);
        setShowForm(true);
    };

    const handleSaveUpdatedEmployee = async (e) => {
        e.preventDefault();
        try {
            await updateEmployee(formData._id, formData);
            setEmployees((prev) =>
                prev.map((emp) => (emp._id === formData._id ? { ...formData } : emp))
            );
            setShowForm(false);
            setFormData({ first_name: '', last_name: '', email: '', position: '', salary: '', department: '' });
        } catch (err) {
            setError('Failed to update employee');
            setTimeout(() => setError(''), 3000);
        }
    };

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token'); // Clear token
        navigate('/'); // Redirect to login
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Employee Portal</h2>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Logout
                </button>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <button
                className="btn btn-primary mb-4"
                onClick={() => {
                    setShowForm((prev) => !prev);
                    setFormData({ first_name: '', last_name: '', email: '', position: '', salary: '', department: '' });
                }}
            >
                {showForm ? 'Cancel' : 'Create New Employee'}
            </button>
            {showForm && (
                <form
                    onSubmit={formData._id ? handleSaveUpdatedEmployee : handleCreateEmployee}
                    className="mb-4"
                >
                    <div className="mb-3">
                        <input
                            type="text"
                            name="first_name"
                            placeholder="First Name"
                            value={formData.first_name}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="last_name"
                            placeholder="Last Name"
                            value={formData.last_name}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="position"
                            placeholder="Position"
                            value={formData.position}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="number"
                            name="salary"
                            placeholder="Salary"
                            value={formData.salary}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="department"
                            placeholder="Department"
                            value={formData.department}
                            onChange={handleInputChange}
                            className="form-control"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-success">
                        {formData._id ? 'Update Employee' : 'Create Employee'}
                    </button>
                </form>
            )}
            {selectedEmployee && (
                <div className="card mb-4">
                    <div className="card-header">
                        <h4>Employee Details</h4>
                    </div>
                    <div className="card-body">
                        <p>
                            <strong>First Name:</strong> {selectedEmployee.first_name}
                        </p>
                        <p>
                            <strong>Last Name:</strong> {selectedEmployee.last_name}
                        </p>
                        <p>
                            <strong>Email:</strong> {selectedEmployee.email}
                        </p>
                        <p>
                            <strong>Position:</strong> {selectedEmployee.position}
                        </p>
                        <p>
                            <strong>Department:</strong> {selectedEmployee.department}
                        </p>
                        <p>
                            <strong>Salary:</strong> {selectedEmployee.salary}
                        </p>
                    </div>
                </div>
            )}
            <table className="table table-bordered mt-4">
                <thead className="table-dark">
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp._id}>
                            <td>{emp.first_name}</td>
                            <td>{emp.last_name}</td>
                            <td>{emp.department}</td>
                            <td>{emp.position}</td>
                            <td>{emp.email}</td>
                            <td>
                                <button
                                    className="btn btn-primary me-2"
                                    onClick={() => setSelectedEmployee(emp)}
                                >
                                    View Details
                                </button>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => handleUpdateEmployee(emp)}
                                >
                                    Update
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDeleteEmployee(emp._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeePortal;
