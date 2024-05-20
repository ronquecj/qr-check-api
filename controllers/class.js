import Class from '../models/Class.js';
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
