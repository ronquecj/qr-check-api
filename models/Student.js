import mongoose from 'mongoose';

const StudentSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      unique: true,
    },
    userData: {
      type: Object,
      required: true,
    },
    classData: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      default: 'Absent',
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', StudentSchema);
export default Student;
