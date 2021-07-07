import mongoose, { Schema } from 'mongoose';
import IPost from '../interfaces/posts.interface';

const PostSchema: Schema = new Schema(
    {
        content: { type: String, required: true },
        author: { type: String, required: true },
        topic:{type: Schema.Types.ObjectId, ref: "Topic"}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IPost>('Post', PostSchema)