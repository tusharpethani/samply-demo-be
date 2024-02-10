import express from 'express';
import { loginUser } from '../controllers/users/users.controller.js';

const router = express.Router();

router.post('/login', loginUser);

export { router as UsersRoutes };
