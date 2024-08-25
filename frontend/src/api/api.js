// src/api/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/',  // Your API base URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    console.log("Retrieved token from localStorage:", token);  // Debug log
    if (token) {
        console.log("Token is present:", token);  // Debug log
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        console.log("No token found");  // Debug log
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export default api;
