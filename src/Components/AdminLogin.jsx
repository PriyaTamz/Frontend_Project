import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword, selectEmail, selectPassword } from '../features/authentication/AdminRegisterSlice';
import { useNavigate, Link } from 'react-router-dom';
import authServices from '../services/authService';
import './AdminAuth.css';

const AdminLogin = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [loginError, setLoginError] = useState('');

    const email = useSelector(selectEmail);
    const password = useSelector(selectPassword);

    const handleAdminLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await authServices.adminlogin({ email, password });
            alert(response.data.message);
            localStorage.setItem('token', response.data.token);
            dispatch(setEmail(''));
            dispatch(setPassword(''));
            navigate('/dashboard');
        } catch (error) {
            setLoginError(error.response.data.message || 'Login failed');
        }
    };

    return (
        <div className="container">
            <h2>Admin Login</h2>
            {loginError && <p className="error">{loginError}</p>}
            <form onSubmit={handleAdminLogin}>
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
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to="/admin-register">Register here</Link></p>
            </form>
        </div>
    );
};

export default AdminLogin;
