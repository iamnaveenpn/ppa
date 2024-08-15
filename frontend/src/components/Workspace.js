// components/Workspace.js
import React, { useState, useEffect } from "react";
import { Card, Button, Form, ListGroup, Container } from "react-bootstrap";
import api from "../api/api";

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
    const token = localStorage.getItem("token");
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

  return (
    <div className="py-5">
      <Container>
        <h2>Workspace</h2>
        <div className="pb-5">
          <Form onSubmit={handleAddTask} className="d-flex flex-wrap align-items-end gap-2">
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
          {tasks.map((task) => (
            <ListGroup.Item key={task.id}>{task.name}</ListGroup.Item>
          ))}
        </ListGroup>
      </Container>
    </div>
  );
};

export default Workspace;
