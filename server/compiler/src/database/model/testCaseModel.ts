import mongoose, { Schema } from "mongoose";

interface ITestCase {
    problem: string;
    input: string;
    expectedOutput: string;
    visibility: 'public' | 'hidden'
}

const testCaseSchema: Schema<ITestCase> = new Schema({
    problem: {
        type: String,
        required: true,
        index: true
    },
    input: {
        type: String,
        required: true
    },
    expectedOutput: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        enum: ['public', 'hidden'],
        required: true
    },
}, {
    timestamps: true
});

export const TestCaseModel = mongoose.model<ITestCase>('TestCase', testCaseSchema)