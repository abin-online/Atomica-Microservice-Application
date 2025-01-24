import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../../../domain/entities/IUser';

interface IUserDocument extends IUser, Document { }

const UserSchema = new Schema<IUserDocument>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },

});

const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
