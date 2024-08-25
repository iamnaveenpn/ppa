// src/components/Profile.js
import React, { useEffect, useState } from "react";
import api from "../api/api"; // Import the api instance
import { Form, Button, Container, Spinner, Alert } from "react-bootstrap";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);  // Add loading state
  const [error, setError] = useState("");  // Add error state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profiles/");
        if (response.data && response.data.length > 0) {
          const userProfile = response.data[0]; // Since the backend returns only the authenticated user's profile
          setProfile(userProfile);
          setUsername(userProfile.user.username || "");  // Add default value
          setEmail(userProfile.user.email || "");        // Add default value
        } else {
          setError("Profile data is not available.");
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);  // Set loading to false after fetching
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      if (profile && profile.id) {
        await api.put(`/profiles/${profile.id}/`, { 
          user: {
            username,
            email
          }
        });
        alert("Profile updated successfully");
      } else {
        alert("Profile not found.");
      }
    } catch (error) {
      console.error("Profile update failed", error);
      alert("Profile update failed.");
    }
  };

  return (
    <div className="py-5">
      <Container>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">
            {error}
          </Alert>
        ) : (
          profile && (
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
          )
        )}
      </Container>
    </div>
  );
};

export default Profile;
