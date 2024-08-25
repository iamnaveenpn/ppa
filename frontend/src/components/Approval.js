// Approval.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Approval({ match }) {
    const [task, setTask] = useState({});
    const [approved, setApproved] = useState(false);

    useEffect(() => {
        const taskId = match.params.id;
        axios.get(`/api/tasks/${taskId}/`).then(res => {
            setTask(res.data);
        });
    }, [match.params.id]);

    const handleApproval = () => {
        axios.post('/api/approval/', { task: task.id, approved_by: localStorage.getItem('userId') }).then(() => {
            setApproved(true);
        });
    };

    return (
        <div>
            <h2>{task.title}</h2>
            <p>{task.description}</p>
            {task.status === 'Completed' && !approved && (
                <button onClick={handleApproval}>Approve Task</button>
            )}
            {approved && <p>Task Approved!</p>}
        </div>
    );
}

export default Approval;
