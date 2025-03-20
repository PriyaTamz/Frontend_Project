import React, { useState } from 'react';
import axios from 'axios';
import './UploadList.css';

function UploadList() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        
        if (!file) {
            setMessage("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("http://localhost:3001/lists/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error uploading file");
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Agent List</h2>
            <form onSubmit={handleUpload} className="upload-form">
                <input type="file" onChange={handleFileChange} accept=".csv, .xlsx, .xls" />
                <button type="submit">Submit</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
}

export default UploadList;
