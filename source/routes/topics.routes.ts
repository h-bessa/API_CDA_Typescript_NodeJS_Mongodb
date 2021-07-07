import express from 'express';
import controller from '../controllers/topics.controller';

const router = express.Router();

//Get all topics
router.get('/AllTopics', controller.getAllTopics);

//Get one topic
router.get('/:topicId', controller.getOneTopic);

//Delete one topic
router.delete('/:topicId', controller.deleteOneTopic);

//Create post in topic
router.post('/:topicId/post', controller.createPostInTopic);

//Post a topic
router.post('/create/topic', controller.createTopic);

//Update a topic
router.patch('/:topicId', controller.patchOneTopic);

export = router;
