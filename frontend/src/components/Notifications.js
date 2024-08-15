// components/Notifications.js
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Container } from 'react-bootstrap';

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            const token = localStorage.getItem('token');
            const response = await api.get('notifications/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setNotifications(response.data);
        };
        fetchNotifications();
    }, []);

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
