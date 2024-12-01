import React, { useState } from 'react';
import { searchEmployees } from '../api';

const SearchBar = ({ onSearchResults }) => {
    const [query, setQuery] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query) {
            try {
                const response = await searchEmployees(query);
                onSearchResults(response.data); // Pass results to parent component
            } catch (err) {
                console.error('Error searching employees:', err);
            }
        }
    };

    return (
        <form onSubmit={handleSearch} className="d-flex justify-content-center mb-5">
            <input
                type="text"
                placeholder="Search employees..."
                value={query}
                className="form-control rounded me-2"
                onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn btn-outline-light rounded" type="submit">Search</button>
        </form>
    );
};

export default SearchBar;
