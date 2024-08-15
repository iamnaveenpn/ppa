import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskDetail from "./components/TaskDetail";
import TaskForm from "./components/TaskForm";
import Register from "./components/Register";
import Login from "./components/Login";
import Workspace from "./components/Workspace";
import Notifications from "./components/Notifications";
import Profile from "./components/Profile";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header"; // Import the Header component

import 'bootstrap/dist/css/bootstrap.min.css';
import Tasks from "./components/Tasks";

// Define the routes for the application
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <div className="container h-100 d-flex align-items-center justify-content-center py-5 ">
        <h1>Home Page</h1>
        </div>
      </>
    ),
  },
  {
    path: "/tasks",
    element: (
      <>
        <Header />
        <Tasks />
      </>
    ),
  },
  {
    path: "/task/:id",
    element: (
      <>
        <Header />
        <TaskDetail />
      </>
    ),
  },
  {
    path: "/add-task",
    element: (
      <>
        <Header />
        <TaskForm />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Header />
        <Register />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Header />
        <Login />
      </>
    ),
  },
  {
    path: "/workspace",
    element: (
      <>
        <Header />
        <Workspace />
      </>
    ),
  },
  {
    path: "/notifications",
    element: (
      <>
        <Header />
        <Notifications />
      </>
    ),
  },
  {
    path: "/profile",
    element: (
      <>
        <Header />
        <Profile />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
]);

// Main application component
function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
