import mongoose, { Model, Schema } from "mongoose";
import { Iadmin } from "../../../../entities/admin";

const AdminSchema: Schema<Iadmin> = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    role: { type: String, default: 'admin' }
})
const adminModel: Model<Iadmin> = mongoose.model('admin', AdminSchema)
export default adminModel