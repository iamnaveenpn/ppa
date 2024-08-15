// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Container } from 'react-bootstrap';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const token = localStorage.getItem('token');
            const response = await api.get('tasks/', {
                headers: {
                    Authorization: `Token ${token}`,
                },
            });
            setTasks(response.data);
        };
        fetchTasks();
    }, []);

    return (
        <div className='py-5'>
           <Container>
           <h2>Dashboard</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>{task.name}</li>
                ))}
            </ul>
           </Container>
        </div>
    );
};

export default Dashboard;
