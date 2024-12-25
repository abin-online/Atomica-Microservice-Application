import { ObjectId } from "mongoose";

export interface IMcqUseCase {
    createQuestion(data: any): Promise<any>;
    getAllQuestions(): Promise<any[]>;
    blockQuestion(questionId: string, blocked: boolean): Promise<any>;
    getQuestionById(id: string): Promise<any>;
    updateQuestion(id: string, data: any): Promise<any>;
    getMCQ(tag: string, difficulty: string) : Promise<any[]>
  }
   