import { IBadge } from "../entities/IBadge";
import { Schema, Model, model } from "mongoose";

const badgeSchema: Schema<IBadge> = new Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    minQuestionsSolved: { type: Number, required: true }, 
    isActive: { type: Boolean, default: true },
    createdBy: { type: String, required: true },
  });
  
 export const BadgeModel: Model<IBadge> = model("Badge", badgeSchema);
  