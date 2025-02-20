import mongoose from "mongoose";

const TeacherSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: Date,
  contact: String,
  salary: Number,
  subject: String,
  assignedClass: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }  // ✅ Reference to Class
});

const Teacher = mongoose.model("Teacher", TeacherSchema);
export default Teacher;
