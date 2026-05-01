const express = require('express');
const app = express();

app.use(express.json());

const PORT = 5000;

// In-memory data (acts like database)
let students = [
    { id: 1, name: "Arun", age: 20, dept: "CSE" },
    { id: 2, name: "Meena", age: 21, dept: "ECE" }
];

// Home route
app.get('/', (req, res) => {
    res.send("Student REST API is running");
});

// GET all students
app.get('/students', (req, res) => {
    res.status(200).json(students);
});

// GET student by ID
app.get('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(student);
});

// POST add new student
app.post('/students', (req, res) => {
    const { id, name, age, dept } = req.body;

    if (students.find(s => s.id === id)) {
        return res.status(400).json({ message: "ID already exists" });
    }

    students.push({ id, name, age, dept });
    res.status(201).json({ message: "Student added", students });
});

// PUT update student
app.put('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, age, dept } = req.body;
    student.name = name || student.name;
    student.age = age || student.age;
    student.dept = dept || student.dept;

    res.status(200).json({ message: "Student updated", student });
});

// DELETE student
app.delete('/students/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);
    res.status(200).json({ message: "Student deleted", students });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});