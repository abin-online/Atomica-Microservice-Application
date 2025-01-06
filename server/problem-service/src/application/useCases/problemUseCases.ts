import { IProblemRepository } from "../interfaces/repositoryInterfaces/problemRepositoryInterfaces";

export default class ProblemUseCase {
  private problemRepository: IProblemRepository;

  constructor(problemRepository: IProblemRepository) {
    this.problemRepository = problemRepository;
  }

  async createProblem(data: any): Promise<any> {
    return await this.problemRepository.create(data);
  }

  async updateProblem(id: string, data: any): Promise<any> {
    return await this.problemRepository.updateById(id, data);
  }

  async blockProblem(problemId: string, blocked: boolean): Promise<any> {
    return await this.problemRepository.updateBlockedStatus(problemId, blocked);
  }

  async getProblemById(id: string): Promise<any> {
    return await this.problemRepository.findById(id);
  }

  async getAllProblems(): Promise<any[]> {
    return await this.problemRepository.findAll();
  }

  async getAllTags(): Promise<any[]> {
    return await this.problemRepository.getAllTags();
  }

  async getProblems(): Promise<any[]> {
    return await this.problemRepository.getProblems() //only unblocked problems, for client and testcases
  }
}
