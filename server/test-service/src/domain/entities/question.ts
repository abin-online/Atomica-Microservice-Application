import { Types } from "mongoose";

export interface IMCQ {
  question: string;
  options: {
    option1: string;
    option2: string;
    option3: string;
    option4: string;
  };
  correctAnswer: string;
  difficulty: string;
  tags: Types.ObjectId;
  blocked?: boolean;
}
