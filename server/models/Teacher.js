import mongoose from 'mongoose';
const TeacherSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: Date,
  contact: String,
  salary: Number,
  assignedClass: mongoose.Schema.Types.ObjectId
});
export default mongoose.model('Teacher', TeacherSchema);