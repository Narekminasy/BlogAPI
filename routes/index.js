import express from 'express';
import postsRouter from './posts.js';

const router = express.Router();

router.use('/api', postsRouter);

export default router;


