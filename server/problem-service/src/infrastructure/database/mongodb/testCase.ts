import mongoose, { Schema } from "mongoose";
import { ITestCase } from "../../../domain/entities/testCase";

const testCaseSchema: Schema<ITestCase> = new Schema({
    problem: {
        type: String,
        required: true,
        index: true
    },
    input: {
        type: [
          {
            params: { type: String, required: true }, 
        },
        ],
        required: true,
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