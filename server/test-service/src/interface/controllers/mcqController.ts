import { Request, Response, NextFunction } from "express";
import { IMcqUseCase } from "../../application/interfaces/useCaseInterfaces/mcqUseCaseInterface";
import ErrorHandler from "../../application/usecases/middleware/errorHandler";

export default class McqController {
  private mcqUseCase: IMcqUseCase;

  constructor(mcqUseCase: IMcqUseCase) {
    this.mcqUseCase = mcqUseCase;
    this.createQuestion = this.createQuestion.bind(this);
    this.getAllQuestions = this.getAllQuestions.bind(this);
    this.blockQuestion = this.blockQuestion.bind(this);
    this.getEditQuestion = this.getEditQuestion.bind(this);
    this.updateQuestion = this.updateQuestion.bind(this);
    this.getMCQ = this.getMCQ.bind(this);
  }

  async createQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { question, options, correctAnswer, difficulty, tags } = req.body;
      console.log(req.body)
      if (!question || !options || !correctAnswer || !difficulty || !tags) {
        res.status(400).json({ error: "All fields are required" });
      }
      const newMCQ = await this.mcqUseCase.createQuestion({ question, options, correctAnswer, difficulty, tags });
      res.status(201).json({ message: "Question created", question: newMCQ });
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async getAllQuestions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const questions = await this.mcqUseCase.getAllQuestions();
      res.status(200).json(questions);
    } catch (error) {
      next(error);
    }
  }

  async blockQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { questionId, blocked } = req.body;
      const updatedQuestion = await this.mcqUseCase.blockQuestion(questionId, blocked);
      if (!updatedQuestion) {
         res.status(404).json({ error: "Question not found" });
      }
      res.status(200).json(updatedQuestion);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async getEditQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const question = await this.mcqUseCase.getQuestionById(id);
      if (!question) {
        res.status(404).json({ error: "Question not found" });
      }
      res.status(200).json(question);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async updateQuestion(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const { question, options, correctAnswer, difficulty, tags } = req.body;
      const updatedQuestion = await this.mcqUseCase.updateQuestion(id, { question, options, correctAnswer, difficulty, tags });
      if (!updatedQuestion) {
        res.status(404).json({ error: "Question not found" });
      }
      res.status(200).json(updatedQuestion);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async getMCQ(req: Request, res: Response, next: NextFunction) : Promise<void> {
    try {
      console.log("Query_______",req.query)
      const {difficulty, tag} = req.query;
      const mcq = await this.mcqUseCase.getMCQ(tag as string, difficulty as string);
      if(!mcq) {
        res.status(404).json({error: 'mcqs not found  '})
      }
      res.status(200).json(mcq)
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }

  async getMCQForContest(req: Request, res: Response, next: NextFunction) : Promise<void> {
    try {
        const {question} = req.body;
        console.log("contest arrayfrom controller ", req.body)

        const mCQForContest = await this.mcqUseCase.getMCQForContest(question);
        console.log(mCQForContest)
        res.status(200).json(mCQForContest)
    } catch (error : any) {
      return next(new ErrorHandler(error.status, error.message))
    }
  }
}
