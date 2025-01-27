import mongoose, { Document, Schema } from 'mongoose';
import { IContest } from '../../../domain/entities/IContest';


const ContestSchema = new Schema<IContest & Document>({
    contestName: {
        type: String,
        required: true
    },
    selectedProblems: {
        type: [String],
        required: true
    },
    selectedMCQs: {
        type: [String],
        required: true
    },
    points: {
        type: Number,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    candidate: {
        type: [{
            name: {
                type: String,
                required: true
            },
            duration: {
                type: Number,
                required: true
            },
            points: {
                type: Number,
                required: true
            }
        }],
        default: []
    },
    expiryDate: {
        type: String,
        required: true
    }
}, {timestamps: true});


const Contest = mongoose.model<IContest & Document>('Contest', ContestSchema);

export default Contest;
