import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import students from './routes/students.js';
import teacherRoutes from './routes/teachers.js';
import classRoutes from './routes/classes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/students', students);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the School CRM API');
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));



 
  