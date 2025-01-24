
import mongoose, { Schema, Document } from 'mongoose';
import { ISolution } from '../../../domain/entities/ISolution';


interface ISolutionDocument extends ISolution, Document { }

const SolutionSchema = new Schema<ISolutionDocument>({
    author: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    problem: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        default: ''
    },
    language: {
        type: String,
        required: true
    },
    upvotes: [],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Solution = mongoose.model<ISolutionDocument>('Solution', SolutionSchema);

export default Solution;
