import { NextFunction, Request, Response } from 'express';
import Topic from '../models/topics.model';
import Post from '../models/posts.model';
import mongoose from 'mongoose';

const createTopic = (req: Request, res: Response, next: NextFunction) => {
    let {title} = req.body;

    const topic = new Topic({
        _id: new mongoose.Types.ObjectId(),
        title
    });

    return topic.save()
    .then((result) => {
        return res.status(201).json({
            topic: result
        })
    })
    .catch((error: any) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};


const createPostInTopic = (req: Request, res: Response, next: NextFunction) => {
    let {author, content} = req.body;

    //Get topic
    Topic.findById(req.params.topicId)
    .exec()
    .then((results: any) => {
        let topic = results;
        const post = new Post({
            _id: new mongoose.Types.ObjectId(),
            author, 
            content
        });
        topic.posts.push(post);
        topic.save();
        return post.save()
        .then((result) => {
            return res.status(201).json({
                post: result
            })
        })
        .catch((error: any) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
    })
    .catch((error: any) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });   

};

const getOneTopic= (req: Request, res: Response, next: NextFunction) => {
    Topic.findById(req.params.topicId)
    .exec()
    .then((results: any) => {
        return res.status(200).json({
            topic: results,
            count: results.length
        });
    })
    .catch((error: any) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};

const deleteOneTopic = (req: Request, res: Response, next: NextFunction) => {
    Topic.remove({_id: req.params.topicId})
    .exec()
    .then((results: any) => {
        return res.status(201).json({
            topic: results,
            count: results.length
        });
    })
    .catch((error: any) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};

const patchOneTopic = (req: Request, res: Response, next: NextFunction) => {
    Topic.updateOne({_id: req.params.topicId}, { $set: {title: req.body.title}})
    .exec()
    .then((results: any) => {
        return res.status(201).json({
            topic: results,
            count: results.length
        });
    })
    .catch((error: any) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};

const getAllTopics = (req: Request, res: Response, next: NextFunction) => {
    Topic.find()
    .exec()
    .then((results: any) => {
        return res.status(200).json({
            topics: results,
            count: results.length
        });
    })
    .catch((error: any) => {
        return res.status(500).json({
            message: error.message,
            error
        });
    });
};

export default { getAllTopics, createTopic, getOneTopic, deleteOneTopic, patchOneTopic, createPostInTopic};
