// components/Dashboard.js
import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
           <Row>
                {tasks.map(task => (
                    <Col key={task.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{task.title}</Card.Title>
                                <Card.Text>{task.description}</Card.Text>
                                <Link to={`/task/${task.id}`}>
                                    <Button variant="primary">View Details</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
           </Container>
        </div>
    );
};

export default Dashboard;
