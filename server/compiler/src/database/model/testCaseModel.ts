import mongoose, { Schema } from "mongoose";

export interface ITestCase {
    problem: string;
    _id?: string;
    input: { params: string }[];  
    expectedOutput: any;  
    visibility: 'public' | 'hidden';  
  }
  

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