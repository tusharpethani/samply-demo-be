import express from 'express';
import { UsersRoutes } from './users.routes.js';
import { TodoRoutes } from './todo.routes.js';

const router = express.Router();

router.use('/users', UsersRoutes);
router.use('/todo', TodoRoutes);

export { router };
