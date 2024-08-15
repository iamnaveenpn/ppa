// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Header = () => {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand as={Link} to="/">Task Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link as={Link} to="/workspace">Workspace</Nav.Link>
                        <Nav.Link as={Link} to="/notifications">Notifications</Nav.Link>
                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                        <NavDropdown title="Tasks" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/add-task">Add Task</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/tasks">View All Tasks</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/completed-tasks">Completed Tasks</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
