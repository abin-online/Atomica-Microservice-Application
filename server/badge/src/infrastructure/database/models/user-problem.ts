import { Model, model, Schema } from "mongoose";
import { UserProblem } from "../../../domain/entities/user-problem";

const userSchema: Schema<UserProblem> = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        badges: {
            type: [String],
            default: [],
        },
        attempted: {
            type: Number,
            default: 0,
        },
        solved: {
            type: Number,
            default: 0,
        },
        completed: [
            {
                problem: { type: String, required: true },
                submissionDate: { type: Date, required: true },
            },
        ],
        points: {
            type: Number,
            default: 0,
        },
        streak: {
            current: { type: Number, default: 0 },
            highest: { type: Number, default: 0 },
            lastUpdated: { type: Date },
        },
    },
    { timestamps: true }
);


const userProblemModel: Model<UserProblem> = model<UserProblem>('user-problem', userSchema);

export default userProblemModel;
