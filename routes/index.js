import express from 'express';
import postsRouter from './posts.js';
import usersRouter from './users.js';

const router = express.Router();

router.use('/api', postsRouter);
router.use('/users', usersRouter);

export default router;


