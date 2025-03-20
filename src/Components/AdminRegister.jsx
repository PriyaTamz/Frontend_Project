import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setName, setEmail, setPassword, selectName, selectEmail, selectPassword } from '../features/authentication/AdminRegisterSlice';
import { useNavigate, Link } from 'react-router-dom';
import authServices from '../services/authService';
import './AdminAuth.css';

const AdminRegister = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [registerError, setRegisterError] = useState('');

    const name = useSelector(selectName);
    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);

    const handleAdminRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await authServices.adminRegister({ name, email, password });
            alert(response.data.message);
            dispatch(setName(''));
            dispatch(setEmail(''));
            dispatch(setPassword(''));
            navigate('/');
        } catch (error) {
            setRegisterError(error.response.data.message || 'Registration failed');
        }
    };

    return (
        <div className="container">
            <h2>Admin Registration</h2>
            {registerError && <p className="error">{registerError}</p>}
            <form onSubmit={handleAdminRegister}>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => dispatch(setName(e.target.value))}
                    placeholder="Enter name"
                />
                <br />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    placeholder="Enter email"
                />
                <br />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    placeholder="Enter password"
                />
                <br />
                <button type="submit">Register</button>
                <p>Already have an account? <Link to="/">Login here</Link></p>
            </form>
        </div>
    );
};

export default AdminRegister;
