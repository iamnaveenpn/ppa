// src/components/Profile.js
import React, { useEffect, useState } from "react";
import api from "../api/api"; // Import the api instance
import { Form, Button, Container } from "react-bootstrap";

const Profile = () => {
  const [user, setUser] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/profiles/");
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/profiles/${user.id}/`, { username, email });
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Profile update failed", error);
    }
  };

  return (
    <div className="py-5">
      <Container>
        <Form onSubmit={handleUpdate} className="d-flex flex-wrap gap-3 align-items-end">
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Profile;
