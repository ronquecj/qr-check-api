import express from 'express';
import { getUser } from '../controllers/user.js';
import { verifyToken } from '../middleware/auth.js';
import {
  getStudents,
  newStudent,
  setStudentStatus,
} from '../controllers/student.js';

const router = express.Router();

router.get('/:id', getStudents);
router.post('/new', newStudent);
router.post('/status', setStudentStatus);

// READ
router.get('/:id', getUser);

// UPDATE

export default router;
