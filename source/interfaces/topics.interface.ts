import { Document, ObjectId } from 'mongoose';

export default interface ITopic extends Document {
    title: string;
    posts: any;
}