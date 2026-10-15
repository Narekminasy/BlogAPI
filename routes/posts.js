import express from 'express';
import postsController from '../controllers/postsControllers.js';
const router = express.Router();


router.post('/posts', postsController.createPosts);

router.get('/posts', postsController.getPosts);

router.get('/posts/:id', postsController.getPostById);

router.post('/posts/:id', postsController.updatePosts);

router.delete('/posts/:id', postsController.removiePosts);






export default router;
