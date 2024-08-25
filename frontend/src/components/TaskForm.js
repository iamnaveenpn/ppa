// src/components/TaskForm.js
import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import api from "../api/api";

const TaskForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignee, setAssignee] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("");
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    // Fetch the list of employees to assign tasks
    api
      .get("/employees/")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));

    if (id) {
      // If there's an id, fetch the task data for editing
      api
        .get(`tasks/${id}/`)
        .then((response) => {
          const task = response.data;
          setTitle(task.title);
          setDescription(task.description);
          setAssignee(task.assignee);
          setDueDate(task.due_date);
          setStatus(task.status);
        })
        .catch((error) => console.error("Error fetching task:", error));
    }
  }, [id]);

 const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
        title,
        description,
        assigned_to: assignee,  // Ensure this matches your model field name
        due_date: dueDate,
        status,
    };

    if (id) {
        // Update existing task
        api
            .put(`/tasks/${id}/`, taskData)
            .then(() => navigate("/dashboard"))
            .catch((error) => console.error("Error updating task:", error.response.data));
    } else {
        // Create new task
        api
            .post("/tasks/", taskData)
            .then(() => navigate("/dashboard"))
            .catch((error) => console.error("Error creating task:", error.response.data));
    }
};


  return (
    <div className="py-5">
      <Container>
        <h2>{id ? "Edit Task" : "Add New Task"}</h2>
        <Form
          onSubmit={handleSubmit}
          className="d-flex flex-wrap align-items-end gap-3"
        >
          <div className="w-100 d-flex flex-column gap-3">
            <Form.Group controlId="formTaskTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTaskDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
          </div>

          <Form.Group controlId="formTaskAssignee">
            <Form.Label>Assign to</Form.Label>
            <Form.Control
              as="select"
              value={assignee}
              onChange={(e) => setAssignee(e.target.value)}
              required
            >
              <option value="">Select Assignee</option>
              {employees.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.username}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formTaskDueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formTaskStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            {id ? "Update Task" : "Create Task"}
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default TaskForm;
