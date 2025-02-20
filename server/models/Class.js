import mongoose from 'mongoose';
const ClassSchema = new mongoose.Schema({
  name: String,
  year: Number,
  teacher: mongoose.Schema.Types.ObjectId,
  studentFees: Number,
  students: [mongoose.Schema.Types.ObjectId]
});
export default mongoose.model('Class', ClassSchema);