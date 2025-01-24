import mongoose, { Schema, Document } from 'mongoose';
import { IComment } from '../../../domain/entities/IComment';

interface ICommentDocument extends IComment, Document { }

const CommentSchema = new Schema<ICommentDocument>({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Comment = mongoose.model<ICommentDocument>('Comment', CommentSchema);

export default Comment;
