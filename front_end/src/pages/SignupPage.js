import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../api';

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        console.log('Signup data:', { username, email, password }); // Log data being sent
        try {
            const response = await createUser({ username, email, password });
            console.log('Signup successful:', response); // Log response from the API
            navigate('/'); // Redirect to login page
        } catch (err) {
            console.error('Signup error:', err.response?.data || err.message); // Log error
            setError('Failed to create account');
        }
    };
    

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center mb-4 mt-5">Sign Up</h2>
                    {error && <p className="text-danger">{error}</p>}
                    <form onSubmit={handleSignup}>
                        <div className="mb-3">
                            <label>Username</label>
                            <input
                                type="text"
                                className="form-control"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Sign Up</button>
                    </form>
                    <p className="text-center mt-3">
                        Already have an account? <a href="/">Login</a>
                    </p>
                </div>
            </div>
        </div>

    );
};

export default SignupPage;
