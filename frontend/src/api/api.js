// src/api/api.js

import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',  // Your API base URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');  // Retrieve token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;  // Set the Authorization header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
