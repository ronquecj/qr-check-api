import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema(
  {
    subjectName: {
      type: String,
      required: true,
    },
    courseSection: {
      type: String,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Class = mongoose.model('Class', ClassSchema);
export default Class;
