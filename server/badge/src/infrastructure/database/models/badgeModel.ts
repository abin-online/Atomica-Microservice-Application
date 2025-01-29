import { Schema, Model, model } from "mongoose";
import { IBadge } from "../../../domain/entities/badge";

const badgeSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    minQuestionsSolved: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: ["problem", "test"],
        required: true,
    },
    imageURL: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: String,
        default: Date.now()
    },
});

export const BadgeModel: Model<IBadge> = model<IBadge>("Badge", badgeSchema);
