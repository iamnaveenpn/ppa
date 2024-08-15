// components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import api from '../api/api';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('login/', {
                username,
                password,
            });
            // Store tokens in localStorage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            // Redirect to dashboard after successful login
            navigate('/dashboard');
        } catch (error) {
            setError('Login failed. Please check your username and password.');
            console.error('Login failed', error);
        }
    };

    return (
        <div className="py-5">
            <Container>
            <Form onSubmit={handleLogin} className='d-flex gap-3 flex-wrap align-items-end'>
            {error && <Alert variant="danger">{error}</Alert>}

            <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit">
                Login
            </Button>
        </Form>
            </Container>
        </div>
    );
};

export default Login;
