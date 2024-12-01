import React, { useState } from 'react';
import SearchBar from './SearchBar';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    const handleSearchResults = (results) => {
        setEmployees(results); // Update employee list with search results
    };

    return (
        <div>
            <SearchBar onSearchResults={handleSearchResults} />
            <table className="table">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Department</th>
                        <th>Position</th>
                        <th>Email</th>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeeList;
