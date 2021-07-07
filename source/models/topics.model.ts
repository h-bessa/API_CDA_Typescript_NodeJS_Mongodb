import mongoose, { Schema } from 'mongoose';
import ITopic from '../interfaces/topics.interface';

const TopicSchema: Schema = new Schema(
    {
        title: { type: String, required: true },
        posts:[{
            type: Schema.Types.ObjectId,
            ref:'Post'
        }]
    },
    {
        timestamps: true
    }
);

export default mongoose.model<ITopic>('Topic', TopicSchema)