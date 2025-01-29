import { Schema, model } from "mongoose";

const collaborationSchema: Schema = new Schema({
    roomId: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    members: [
        {
            type: String
        }
    ],
    duration: {
        type: Date,
        default: null
    },
    expired: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const collaborationModel = model('collab', collaborationSchema)
export default collaborationModel
