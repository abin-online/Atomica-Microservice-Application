import { Model, model, Schema } from "mongoose";
import { IUserMcq } from "../../../domain/entities/user-mcq";

const userSchema: Schema<IUserMcq> = new Schema({
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
    testAttended: {
        type: Number,
        default: 0,
    },
    questionAttended: {
        type: Number,
        default: 0,
    },
    wrongAnswers: {
        type: Number,
        default: 0,
    },
    rightAnswers: {
        type: Number,
        default: 0,
    },
    points: {
        type: Number,
        default: 0,
    }
}, { timestamps: true });

const userModel: Model<IUserMcq> = model<IUserMcq>('user', userSchema);

export default userModel;
