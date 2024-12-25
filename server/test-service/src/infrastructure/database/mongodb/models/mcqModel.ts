import { Model, model, Schema, Types } from "mongoose";
import { IMCQ } from "../../../../domain/entities/question";

const mcqSchema: Schema<IMCQ> = new Schema({
  question: { type: String, required: true },
  options: {
    option1: { type: String, required: true },
    option2: { type: String, required: true },
    option3: { type: String, required: true },
    option4: { type: String, required: true },
  },
  correctAnswer: { type: String, required: true },
  difficulty: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"], 
    required: true, 
  },
  tags: {
    type: Schema.Types.ObjectId,
    ref: 'tags',
    required: true
  },
  blocked: { type: Boolean, default: false },
});

const mcqModel: Model<IMCQ> = model("mcq", mcqSchema);
export default mcqModel;
