import express from 'express';
import controllerPost from '../controllers/posts.controller';

const router = express.Router();

//Get all posts
router.get('/AllPosts', controllerPost.getAllPosts);

//Get one post
router.get('/:postId', controllerPost.getOnePost);

//Delete one post
router.delete('/:postId', controllerPost.deleteOnePost);

//Post a post
router.post('/create/post', controllerPost.createPost);

//Update a post
router.patch('/:postId', controllerPost.patchOnePost);

export = router;
