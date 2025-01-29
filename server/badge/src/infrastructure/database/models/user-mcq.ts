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
    bio: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: ""
    },
    instagram: {
        type: String,
        default: ""    
    },
    linkedIn : {
        type: String,
        default: ""    
    },
    X: {
        type: String,
        default: ""    
    },
    facebook: {
        type: String,
        default: ""   
    },
    website: {
        type: String,        
        default: "" 
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

const userMcqModel: Model<IUserMcq> = model<IUserMcq>('user-mcq', userSchema);

export default userMcqModel;
