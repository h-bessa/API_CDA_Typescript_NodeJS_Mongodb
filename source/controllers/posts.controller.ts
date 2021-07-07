import { NextFunction, Request, Response } from 'express';
import Post from '../models/posts.model';
import Topic from '../models/topics.model';
import mongoose from 'mongoose';

const createPost = (req: Request, res: Response, next: NextFunction) => {
    let {content, author} = req.body;
    const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        content,
        author
    });

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
};

const getOnePost = (req: Request, res: Response, next: NextFunction) => {
    Post.findById(req.params.postId)
    .exec()
    .then((results: any) => {
        return res.status(200).json({
            post: results,
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

const deleteOnePost = (req: Request, res: Response, next: NextFunction) => {
    Post.remove({_id: req.params.postId})
    .exec()
    .then((results: any) => {
        return res.status(201).json({
            post: results,
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

const patchOnePost = (req: Request, res: Response, next: NextFunction) => {
    Post.updateOne({_id: req.params.postId}, { $set: {content: req.body.content, author: req.body.author}})
    .exec()
    .then((results: any) => {
        console.log(results)
        return res.status(201).json({
            post: results,
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

const getAllPosts = (req: Request, res: Response, next: NextFunction) => {
    Post.find()
    .exec()
    .then((results: any) => {
        return res.status(200).json({
            posts: results,
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

export default { getAllPosts, createPost, getOnePost, deleteOnePost, patchOnePost};
