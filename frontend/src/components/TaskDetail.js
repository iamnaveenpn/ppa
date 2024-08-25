import React, { useState, useEffect } from "react";
import api from "../api/api";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  ListGroup,
  Row,
} from "react-bootstrap";

function TaskDetail() {
  const [task, setTask] = useState({});
  const [status, setStatus] = useState("");
  const [comment, setComment] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await api.get(`/tasks/${id}/`); // Fetch task details using the id
        setTask(response.data);
        setStatus(response.data.status); // Initialize status from the fetched task
      } catch (error) {
        console.error("Failed to fetch task details", error);
      }
    };

    fetchTask();
  }, [id]);

  const handleStatusChange = async () => {
    try {
      const response = await api.put(`/tasks/${task?.id}/`, { ...task, status });
      setTask(response.data);
    } catch (error) {
      console.error("Failed to update task status", error);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      const response = await api.post("/comments/", { task: task?.id, content: comment });
      setComment("");
      // Add the new comment to the task's comments
      setTask(prevTask => ({
        ...prevTask,
        comments: [...prevTask.comments, response.data]
      }));
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <Container className="py-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <Card.Header as="h5">Task Details</Card.Header>
            <Card.Body>
              <Card.Title>{task?.title}</Card.Title>
              <Card.Text>{task?.description}</Card.Text>
              <Form.Group controlId="statusSelect">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" onClick={handleStatusChange} className="mt-4">
                Update Status
              </Button>
              <Card.Text className="mt-3">
                <strong>Assigned To:</strong> {task?.assigned_to?.name || "Unassigned"}
              </Card.Text>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Header as="h5">Comments</Card.Header>
            <Card.Body>
              <ListGroup>
                {task?.comments &&
                  task?.comments.map((comment) => (
                    <ListGroup.Item key={comment.id}>
                      {comment.content}
                    </ListGroup.Item>
                  ))}
              </ListGroup>
              <Form.Group className="mt-3">
                <Form.Label>Add a Comment</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  variant="primary"
                  className="mt-4"
                  onClick={handleCommentSubmit}
                >
                  Add Comment
                </Button>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default TaskDetail;
