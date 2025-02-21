import express from 'express';
import Class from '../models/Class.js';
const router = express.Router();

router.post('/', async (req, res) => {
    try {
      const newClass = new Class(req.body);
      const savedClass = await newClass.save();
      res.status(201).json(savedClass); // Ensure `_id` is returned
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });




router.get("/", async (req, res) => {
  try {
    const classes = await Class.find().populate('teacher', 'name'); 

    res.json(classes.map(cls => ({ ...cls.toObject(), className: cls.name })));  // ✅ Add `className`
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {  // ✅ Removed "/api/classes"
  try {
    const result = await Class.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Class not found" });
    }
    res.json({ message: "Class deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting class", error });
  }
});



export default router;