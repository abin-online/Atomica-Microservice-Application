import { Model, model, Schema } from "mongoose";
import { ITag } from "../../../domain/entities/tag";

const tagSchema: Schema<ITag> = new Schema({
  name: { type: String, required: true },
  blocked: { type: Boolean, default: false }
});

const tagModel: Model<ITag> = model("tag", tagSchema);
export default tagModel;