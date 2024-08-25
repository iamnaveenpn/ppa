import React, { useEffect, useState } from "react";
import api from "../api/api"; // Import the api instance
import { Container, Card, Spinner, Alert, Row, Col } from "react-bootstrap";

const CompletedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompletedTasks = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await api.get("tasks/?status=Completed", {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setTasks(response.data);
      } catch (error) {
        console.error("Failed to fetch completed tasks:", error);
        setError("Failed to fetch completed tasks.");
      } finally {
        setLoading(false);
      }
    };
    fetchCompletedTasks();
  }, []);

  if (loading)
    return (
      <div className="py-5">
        <Container>
          <Spinner animation="border" />
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

  return (
    <div className="py-5">
      <Container>
        <h2 className="mb-4">Completed Tasks</h2>
        <Row xs={1} md={2} lg={3} className="g-4">
          {tasks.map((task) => (
            <Col key={task.id}>
              <Card border="success">
                <Card.Body>
                  <Card.Title>{task.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Due: {new Date(task.due_date).toLocaleDateString()}
                  </Card.Subtitle>
                  <Card.Text>{task.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default CompletedTasks;
