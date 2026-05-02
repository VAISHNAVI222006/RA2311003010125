const express = require('express');
const app = express();

app.use(express.json());

const PORT = 4000;

let notifications = [];

// Home
app.get('/', (req, res) => {
    res.send("Notification Service Running ✅");
});

// 🔥 EASY ADD USING URL (NO POSTMAN)
app.get('/add', (req, res) => {
    const { studentId, type, message } = req.query;

    const newData = {
        id: notifications.length + 1,
        studentId: Number(studentId),
        type,
        message,
        isRead: false
    };

    notifications.push(newData);

    res.send("Notification Added ✅");
});

// Get notifications
app.get('/notifications/:studentId', (req, res) => {
    const studentId = Number(req.params.studentId);

    const result = notifications.filter(n => n.studentId === studentId);

    res.json(result);
});

// Mark read
app.get('/read/:id', (req, res) => {
    const id = Number(req.params.id);

    const notif = notifications.find(n => n.id === id);

    if (notif) {
        notif.isRead = true;
        res.send("Marked as read ✅");
    } else {
        res.send("Not found ❌");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
