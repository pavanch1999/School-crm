import mongoose from 'mongoose';
const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  contact: { type: String, required: true },
  feesPaid: { type: Number, required: true }, 
  class: { type: String, required: true },

  classId: mongoose.Schema.Types.ObjectId
});
export default mongoose.model('Student', StudentSchema);