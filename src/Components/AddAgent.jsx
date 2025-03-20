import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    setName, setEmail, setNumber, setPassword,
    selectName, selectEmail, selectNumber, selectPassword, setError
} from '../features/authentication/AddAgentSlice';
import authServices from '../services/authService';
import './AddAgent.css';

const AddAgent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const name = useSelector(selectName);
    const email = useSelector(selectEmail);
    const number = useSelector(selectNumber);
    const password = useSelector(selectPassword);
    const [message, setMessage] = useState('');

    const handleAddAgent = async (e) => {
        e.preventDefault();
        try {
            const response = await authServices.addAgent({ name, email, mobileNumber: number, password });
            setMessage(response.data.message);
            dispatch(setName(''));
            dispatch(setEmail(''));
            dispatch(setNumber(''));
            dispatch(setPassword(''));
        } catch (error) {
            dispatch(setError(error.response?.data?.message || 'Failed to add agent'));
        }
    };

    const handleClose = () => {
        navigate('/dashboard'); 
    };

    return (
        <div className="add-agent-container">
            <button type="button" className="close-button" onClick={handleClose}> X </button>
            <h2>Add Agent</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleAddAgent}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => dispatch(setName(e.target.value))}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                />
                <input
                    type="text"
                    placeholder="Mobile Number"
                    value={number}
                    onChange={(e) => dispatch(setNumber(e.target.value))}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                />
                <button type="submit">Add Agent</button>
            </form>
        </div>
    );
};

export default AddAgent;
