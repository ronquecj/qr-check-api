import express from 'express';
import {
  newClass,
  getClass,
  getClassById,
  approveClass,
  deleteClassByID,
} from '../controllers/class.js';

const router = express.Router();

// Class
router.post('/new', newClass);
router.post('/status/:id', approveClass);
router.get('/', getClass);
router.get('/:id', getClassById);
router.delete('/delete/:id', deleteClassByID);
export default router;
