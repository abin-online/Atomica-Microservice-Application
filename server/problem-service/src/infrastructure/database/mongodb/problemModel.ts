import mongoose, { Schema } from "mongoose";
import { IProblem } from "../../../domain/entities/problem";


const problemSchema: Schema<IProblem> = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    blocked: {
        type: Boolean,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['Beginner', 'Intermmediate', 'Advanced'],
        required: true,
    },
    tags: [
        {
            type: String,
        },
    ],
    inputFormat: [
        {
            name: {
                type: String,
                required: true,
            },
            type: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    outputFormat: {
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    constraints: [
        {
            type: String,
        },
    ],
    hints: [
        {
            type: String,
        },
    ],
}, { timestamps: true })

export const Problem = mongoose.model<IProblem>('Problem', problemSchema)