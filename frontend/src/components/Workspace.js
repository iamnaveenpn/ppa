// components/Workspace.js
import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  ListGroup,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import api from "../api/api";
import { Link } from "react-router-dom";

const Workspace = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await api.get("tasks/");
    setTasks(response.data);
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");
    await api.post(
      "tasks/",
      { name: newTask },
      {
        headers: {
          Authorization: `Token ${token}`,
        },
      }
    );
    setNewTask("");
    fetchTasks();
  };

  console.log(tasks, "tasks");

  return (
    <div className="py-5">
      <Container>
        <h2>Workspace</h2>
        <div className="pb-5">
          <Form
            onSubmit={handleAddTask}
            className="d-flex flex-wrap align-items-end gap-2"
          >
            <Form.Group controlId="formNewTask">
              <Form.Label>New Task</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new task"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Task
            </Button>
          </Form>
        </div>

        <h3>Tasks</h3>
        <ListGroup>
          <Row>
            {tasks.map((task) => (
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
        </ListGroup>
      </Container>
    </div>
  );
};

export default Workspace;
