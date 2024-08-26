// components/Notifications.js
import React, { useEffect, useState } from "react";
import api from "../api/api";
import { Container, Alert } from "react-bootstrap";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await api.get("/notifications/", {
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

  if (loading)
    return (
      <div className="py-5">
        <Container>
          <p>Loading...</p>
        </Container>
      </div>
    );
  if (error)
    return (
      <div className="py-5">
        <Container>
          <Alert variant="danger">{error}</Alert>
        </Container>
      </div>
    );
  console.log(notifications, "notifications");
  return (
    <div className="py-5">
      <Container>
        <h2 className="mb-4">Notifications</h2>
        {notifications.length === 0 ? (
          <Alert variant="info">You have no new notifications.</Alert> // Bootstrap message box
        ) : (
          <ul>
            {notifications.map((notification, index) => (
              <li key={index}>{notification.message}</li>
            ))}
          </ul>
        )}
      </Container>
    </div>
  );
};

export default Notifications;
