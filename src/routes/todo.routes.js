import express from 'express';
import {
    getAllTodo,
    createTodo,
    updateTodo,
} from '../controllers/todo/todo.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.use(authMiddleware);
router.get('/get-all', getAllTodo);
router.post('/add', createTodo);
router.put('/:id', updateTodo);

export { router as TodoRoutes };
