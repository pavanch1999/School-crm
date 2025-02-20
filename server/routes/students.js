import express from 'express';
import Student from '../models/Student.js';

const router = express.Router();

// 📌 Create a new student (POST)
router.post('/', async (req, res) => {
    try {
      const newStudent = new Student(req.body);
      const savedStudent = await newStudent.save();
      res.status(201).json(savedStudent); // Ensure `_id` is returned
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  

// 📌 Get all students (GET)
router.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 📌 Update a student (PUT)
router.put('/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 📌 Delete a student (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
