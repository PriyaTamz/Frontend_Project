import React, { useState, useEffect } from 'react';
import authServices from '../services/authService';
import './ListUploads.css';

function ListAgents({ refresh }) {
    const [agents, setAgents] = useState([]);

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const response = await authServices.listUploads();
                setAgents(response.data.lists);
            } catch (error) {
                console.error("Error fetching agents:", error.message);
            }
        };

        fetchAgents();
    }, [refresh]);

    const groupedAgents = agents.reduce((acc, item) => {
        const agentName = item.agentId?.name || "Unknown";
        if (!acc[agentName]) {
            acc[agentName] = [];
        }
        acc[agentName].push(item);
        return acc;
    }, {});

    return (
        <div className="agent-tasks-container">
            <h2>Agent Tasks</h2>
            {Object.keys(groupedAgents).length > 0 ? (
                Object.keys(groupedAgents).map((agentName, idx) => (
                    <div key={idx} style={{ marginBottom: "20px" }}>
                        <h3>{agentName}'s Tasks</h3>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Email</th>
                                    <th>Mobile Number</th>
                                    <th>First Name</th>
                                    <th>Phone</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {groupedAgents[agentName].map((task, index) => (
                                    <tr key={index}>
                                        <td>{task.agentId?.email}</td>
                                        <td>{task.agentId?.mobileNumber}</td>
                                        <td>{task.FirstName}</td>
                                        <td>{task.Phone}</td>
                                        <td>{task.Notes}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))
            ) : (
                <p className="no-agents-message">No agents available.</p>
            )}
        </div>
    );
}

export default ListAgents;
