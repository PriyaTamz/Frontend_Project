import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAgents, selectAgents, setError } from '../features/authentication/AddAgentSlice';
import authServices from '../services/authService';
import './ListAgents.css';

const ListAgents = () => {
    const dispatch = useDispatch();
    const agents = useSelector(selectAgents);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await authServices.listAgent();
                dispatch(setAgents(response.data.agents));
            } catch (error) {
                dispatch(setError(error.response?.data?.message || 'Failed to fetch agents'));
            }
        };

        fetchAgents();
    }, [dispatch]);

    return (
        <div className="list-agents-container">
            <h2>List of Agents</h2>
            <ul>
                {agents.map((agent) => (
                    <li key={agent._id} className="agent-card">
                        <span className="agent-name">{agent.name}</span>
                        <span className="agent-info">{agent.email}</span>
                        <span className="agent-info">{agent.mobileNumber}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListAgents;
