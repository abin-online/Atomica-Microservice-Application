import { Model, model, Schema } from "mongoose";
import { Iuser } from '../../../../entities/user';

const userSchema: Schema<Iuser> = new Schema({
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
        type: Boolean,
        default: false
    },
    is_verified: {
        type: Boolean,
        default: false
    },

}, {
    timestamps: true
})

const userModel: Model<Iuser> = model('user', userSchema)
export default userModel