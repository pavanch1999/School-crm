import express from 'express';
import Teacher from '../models/Teacher.js';
const router = express.Router();
router.post("/", async (req, res) => {
  try {
    const { name, gender, dob, contact, salary, subject, assignedClass } = req.body;
    
    const newTeacher = new Teacher({
      name,
      gender,
      dob,
      contact,
      salary,
      subject,
      assignedClass
    });

    await newTeacher.save();
    res.status(201).json(newTeacher);
  } catch (error) {
    res.status(500).json({ message: "Error creating teacher", error });
  }
});

router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get('/:name', async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ name: req.params.name });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });
    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;