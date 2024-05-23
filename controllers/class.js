import Class from '../models/Class.js';
import Student from '../models/Student.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

// CREATE REQUEST
export const newClass = async (req, res) => {
  try {
    const { subjectName, courseSection, id } = req.body;
    const user = await User.findById(id);

    const newClass = new Class({
      subjectName,
      courseSection,
      userData: user,
    });

    const savedClass = await newClass.save();
    res.status(201).json(savedClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const approveClass = async (req, res) => {
  try {
    const { id } = req.params;
    const filter = { _id: id };
    const update = { status: 'Approved' };

    const approve = await Class.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.status(200).json(approve);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET REQUEST
export const getClass = async (req, res) => {
  try {
    const cl = await Class.find({});
    res.status(200).json(cl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET REQUEST BY ID
export const getClassById = async (req, res) => {
  try {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;
    const cl = await Class.find({
      'userData._id': new ObjectId(id),
    }).exec();

    res.status(200).json({ count: cl.length, cl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE REQUEST BY ID
export const deleteClassByID = async (req, res) => {
  try {
    const { id } = req.params;
    const ObjectId = mongoose.Types.ObjectId;

    const cl = await Class.deleteOne({
      _id: new ObjectId(id),
    }).exec();

    if (cl.deletedCount === 0) {
      return res.status(404).json({ error: 'Class not found' });
    }

    const deletedStudents = await Student.deleteMany({
      'classData._id': new ObjectId(id),
    }).exec();

    if (deletedStudents.deletedCount === 0) {
      console.log(`No students found with classData.id ${id}`);
      return res.status(404).json({
        error: 'No students found with the provided class ID',
      });
    }

    res.status(200).json({
      message: 'Class and associated students deleted successfully',
      deletedClass: cl,
      deletedStudents: deletedStudents,
    });
  } catch (err) {
    console.error(`Error: ${err.message}`);
    res.status(500).json({ error: err.message });
  }
};
