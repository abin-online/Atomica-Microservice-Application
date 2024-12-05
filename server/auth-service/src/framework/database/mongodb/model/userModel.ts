import { Model, model, Schema } from "mongoose";
import { IUser } from '../../../../entities/user';

const userSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    is_blocked: {
        type: String,
        default: false
    },
    is_verified: {
        type: Boolean,
        default: false
    }
})

const userModel: Model<IUser> = model('user', userSchema)
export default userModel