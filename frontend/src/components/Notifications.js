// components/Notifications.js
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Container, Alert } from 'react-bootstrap';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await api.get('notifications/', {
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                });
                setNotifications(response.data);
            } catch (error) {
                console.error("Failed to fetch notifications:", error);
                setError("Failed to fetch notifications.");
            } finally {
                setLoading(false);
            }
        };
        fetchNotifications();
    }, []);

    if (loading) return <div className='py-5'><Container><p>Loading...</p></Container></div>;
    if (error) return <div className='py-5'><Container><Alert variant="danger">{error}</Alert></Container></div>;

    return (
        <div className='py-5'>
            <Container>
                <h2>Notifications</h2>
                <ul>
                    {notifications.map((notification) => (
                        <li key={notification.id}>{notification.message}</li>
                    ))}
                </ul>
            </Container>
        </div>
    );
};

export default Notifications;

