import mongoose from 'mongoose';
const ClassSchema = new mongoose.Schema({
  className: { type: String, required: true }, 
  year: Number,
  teacher: mongoose.Schema.Types.ObjectId,
  studentFees: Number,
  students: [mongoose.Schema.Types.ObjectId]
});
export default mongoose.model('Class', ClassSchema);