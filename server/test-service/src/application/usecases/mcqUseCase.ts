import { Request, Response, NextFunction } from "express";
import { IMcqUseCase } from "../interfaces/useCaseInterfaces/mcqUseCaseInterface";
import ErrorHandler from "../../application/usecases/middleware/errorHandler";
import { IMcqRepository } from "../interfaces/repositoryInterfaces/testRepositoryInterface";
import { ObjectId } from "mongoose";


export default class McqUseCase implements IMcqUseCase {
  private mcqRepository: IMcqRepository;

  constructor(mcqRepository: IMcqRepository) {
    this.mcqRepository = mcqRepository;
  }

  async createQuestion(data: any): Promise<any> {
    console.log(data)
    return await this.mcqRepository.create(data);
  }

  async getAllQuestions(): Promise<any[]> {
    return await this.mcqRepository.findAll();
  }

  async blockQuestion(questionId: string, blocked: boolean): Promise<any> {
    return await this.mcqRepository.updateBlockedStatus(questionId, blocked);
  }

  async getQuestionById(id: string): Promise<any> {
    return await this.mcqRepository.findById(id);
  }

  async updateQuestion(id: string, data: any): Promise<any> {
    return await this.mcqRepository.updateById(id, data);
  }

  async getMCQ(tag: string, difficulty: string): Promise<any[]> {
    return await this.mcqRepository.fetchToUser(tag, difficulty);
  }

  async getMCQForContest(question: any): Promise<any[]> {
    console.log("contest array from repo", question)

    return await this.mcqRepository.getMCQForContest(question)
  }
}