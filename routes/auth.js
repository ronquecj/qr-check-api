import express from 'express';
import { loginUser, registerUser } from '../controllers/auth.js';

const router = express.Router();

// USER
router.post('/user/login', loginUser);
router.post('/user/register', registerUser);

export default router;
