import mongoose, { Schema } from "mongoose";
import { ITestCase } from "../../../domain/entities/testCase";

const testCaseSchema: Schema<ITestCase> = new Schema({
    problemId: {
        type: String,
        required: true,
        index: true
    },
    input: {
        type: Object,
        required: true
    },
    expectedOutput: {
        type: Schema.Types.Mixed,
        required: true,
    },
    orderMatters: {
        type: Boolean,
        default: false
    },
    visibility: {
        type: String,
        enum: ['public', 'hidden'],
        required: true
    },
}, {
    timestamps: true
});

export const TestCase = mongoose.model<ITestCase>('TestCase', testCaseSchema)