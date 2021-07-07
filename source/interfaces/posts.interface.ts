import { Document, Schema } from 'mongoose';

export default interface IPost extends Document {
    author: string;
    content: string;
    topic: any;
}