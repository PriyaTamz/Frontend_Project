import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminRegister from './Components/AdminRegister';
import AdminLogin from './Components/AdminLogin';
import Dashboard from './Components/Dashboard';
import AddAgent from './Components/AddAgent';
import ListAgents from './Components/ListAgents';
import UploadList from './Components/UploadList';
import ListUploads from './Components/ListUploads';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminLogin />} />
                <Route path="/admin-register" element={<AdminRegister />} />
                
                <Route path="/dashboard" element={<Dashboard />}>
                    <Route path="add-agent" element={<AddAgent />} />
                    <Route path="list-agents" element={<ListAgents />} />
                    <Route path="upload-list" element={<UploadList />} />
                    <Route path="list-uploads" element={<ListUploads />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
