import { Request, Response, NextFunction } from "express";
import { IProblemUseCase } from "../../application/interfaces/useCaseInterface/problemUseCaseInterface";
import ErrorHandler from "../../application/useCases/middleware/errorHandler";

export default class ProblemController {
  private problemUseCase: IProblemUseCase;

  constructor(problemUseCase: IProblemUseCase) {
    this.problemUseCase = problemUseCase;
    this.createProblem = this.createProblem.bind(this);
    this.updateProblem = this.updateProblem.bind(this);
    this.blockProblem = this.blockProblem.bind(this);
    this.getProblem = this.getProblem.bind(this);
    this.getAllProblems = this.getAllProblems.bind(this);
  }

  async createProblem(req: Request, res: Response, next: NextFunction): Promise<void> {
    console.log('haii')
    try {
      const problemData = req.body;
      console.log(problemData)
      const newProblem = await this.problemUseCase.createProblem(problemData);
      res.status(201).json({ message: "Problem created", problem: newProblem });
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async getTags(req: Request, res: Response, next: NextFunction) : Promise<void> {
    try {
        const tags = await this.problemUseCase.getAllTags();
        res.status(200).json(tags)
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));     
    }
  }

  async updateProblem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const problemData = req.body;
      const updatedProblem = await this.problemUseCase.updateProblem(id, problemData);
      res.status(200).json(updatedProblem);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async blockProblem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { problemId, blocked } = req.body;
      const updatedProblem = await this.problemUseCase.blockProblem(problemId, blocked);
      res.status(200).json(updatedProblem);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async getProblem(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const problem = await this.problemUseCase.getProblemById(id);
      res.status(200).json(problem);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async getAllProblems(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const problems = await this.problemUseCase.getAllProblems();
      res.status(200).json(problems);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
}
