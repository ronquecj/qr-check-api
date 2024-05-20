import Class from '../models/Class.js';
import User from '../models/User.js';
import Student from '../models/Student.js';
import mongoose from 'mongoose';

// CREATE REQUEST
export const newStudent = async (req, res) => {
  try {
    const { studentName, classID, userID } = req.body;
    const classData = await Class.findById(classID);
    const userData = await User.findById(userID);

    const newStudent = new Student({
      studentName,
      classData,
      userData,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const setStudentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const filter = { _id: id };
    const update = { status };

    const approve = await Student.findOneAndUpdate(filter, update, {
      new: true,
    });

    res.status(200).json(approve);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET REQUEST
export const getStudents = async (req, res) => {
  try {
    const { classID } = req.body;
    const ObjectId = mongoose.Types.ObjectId;
    const classData = await Class.findById(classID);

    const students = await Student.find({
      'classData._id': new ObjectId(classData._id),
    }).exec();
    res.status(200).json(students);
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
      'studentData._id': new ObjectId(id),
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

    res.status(200).json({ count: cl.length, cl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
