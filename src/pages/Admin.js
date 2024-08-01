import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminChat from '../components/AdminChat';
import AdminUpload from '../components/AdminUpload';
import AdminDashboard from '../components/AdminDashboard';
import AdminSEO from '../components/AdminSEO'; // Import AdminSEO
import '../styles/Admin.css';

const Admin = () => {
    const navigate = useNavigate();
    const [activeComponent, setActiveComponent] = useState('dashboard');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }

        const handleLogout = () => {
            localStorage.removeItem('token');
            navigate('/login');
        };

        const handleActivity = () => {
            clearTimeout(timeout);
            timeout = setTimeout(handleLogout, 3600000); // 1 hour in milliseconds
        };

        let timeout = setTimeout(handleLogout, 3600000); // 1 hour in milliseconds

        window.addEventListener('mousemove', handleActivity);
        window.addEventListener('keydown', handleActivity);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('mousemove', handleActivity);
            window.removeEventListener('keydown', handleActivity);
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="admin-container">
            <div className="sidebar">
                <button onClick={() => setActiveComponent('dashboard')}>Dashboard</button>
                <button onClick={() => setActiveComponent('upload')}>Admin Upload</button>
                <button onClick={() => setActiveComponent('chat')}>Admin Chat</button>
                <button onClick={() => setActiveComponent('seo')}>Pengaturan SEO</button> {/* Tambahkan tombol untuk SEO */}
                <button onClick={handleLogout}>Logout</button>
            </div>
            <div className="content">
                {activeComponent === 'dashboard' && <AdminDashboard />}
                {activeComponent === 'upload' && <AdminUpload />}
                {activeComponent === 'chat' && <AdminChat />}
                {activeComponent === 'seo' && <AdminSEO />} {/* Tambahkan komponen AdminSEO */}
            </div>
        </div>
    );
};

export default Admin;