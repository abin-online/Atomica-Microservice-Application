import { Schema, model } from "mongoose";

const collaborationSchema: Schema = new Schema({
    roomId: {
        type: String,
        required: true
    },

    code: {
        type: String,
        default: null
    },
}, {
    timestamps: true
})

const collaborationModel = model('collab',collaborationSchema )
export default collaborationModel
