// TaskDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskDetail({ match }) {
    const [task, setTask] = useState({});
    const [status, setStatus] = useState('');
    const [comment, setComment] = useState('');

    useEffect(() => {
        const taskId = match.params.id;
        axios.get(`/api/tasks/${taskId}`).then(res => {
            setTask(res.data);
            setStatus(res.data.status);
        });
    }, [match.params.id]);

    const handleStatusChange = () => {
        axios.put(`/api/tasks/${task.id}/`, { ...task, status }).then(res => {
            setTask(res.data);
        });
    };

    const handleCommentSubmit = () => {
        axios.post('/api/comments/', { task: task.id, content: comment }).then(res => {
            setComment('');
            setTask({ ...task, comments: [...task.comments, res.data] });
        });
    };

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
            <button onClick={handleStatusChange}>Update Status</button>
            <h3>Comments</h3>
            {task.comments && task.comments.map(comment => (
                <p key={comment.id}>{comment.content}</p>
            ))}
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
            <button onClick={handleCommentSubmit}>Add Comment</button>
        </div>
    );
}

export default TaskDetail;

