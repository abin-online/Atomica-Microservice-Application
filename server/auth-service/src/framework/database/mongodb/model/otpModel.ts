import mongoose, { Model, Schema } from "mongoose";
import { Iotp } from "../../../../entities/otp";

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: new Date(Date.now() + 60 * 60 * 1000),
        index: {
            expires: '1h'
        }
    }

})

const otpModel: Model<Iotp> = mongoose.model<Iotp>('otp', otpSchema)
export default otpModel;