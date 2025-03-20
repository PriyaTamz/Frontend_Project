import React, { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import authServices from '../services/authService';
import './Dashboard.css';

function Dashboard() {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await authServices.profile({
                    withCredentials: true,
                });
                setProfile(response.data.admin);
            } catch (error) {
                console.error("Error fetching profile:", error.response?.data?.message || error.message);
                alert("Failed to retrieve profile.");
            }
        };

        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await authServices.logout({
                withCredentials: true,
            });
            alert("Logged out successfully");
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error.response?.data?.message || error.message);
            alert("Logout failed. Please try again.");
        }
    };
    

    return (
        <div className="dashboard-container">
            {profile && (
                <div>
                    <p className="welcome-name">Welcome, {profile.name}</p>
                </div>
            )}
            <nav>
                <ul>
                    <li>
                        <Link to="add-agent">Add Agent</Link>
                    </li>
                    <li>
                        <Link to="list-agents">List Agents</Link>
                    </li>
                    <li>
                        <Link to="upload-list">Upload Files</Link>
                    </li>
                    <li>
                        <Link to="list-uploads">List Uploads</Link>
                    </li>
                    <li>
                        <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </li>
                </ul>
            </nav>
            <hr />
            <Outlet />
        </div>
    );
}

export default Dashboard;
