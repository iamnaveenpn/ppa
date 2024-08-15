// src/components/Tasks.js
import React, { useState, useEffect } from 'react';
import api from "../api/api"
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await api.get('tasks/');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
    console.log(tasks, "Tasks")
    return (
        <div className="py-5">
            <Container>
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
            <Link to="/add-task">
                <Button variant="success">Add New Task</Button>
            </Link>
        </Container>
        </div>
    );
};

export default Tasks;
