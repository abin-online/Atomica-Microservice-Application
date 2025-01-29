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
    const problems =  await this.problemRepository.getProblems() 
    console.log('problem use case___' , problems)
    return problems;
  
  }

  async viewProblem(id: string) : Promise<any> {
    return await this.problemRepository.viewProblem(id)
  }

  async getProblemsForContest(question: any) : Promise<any> {
    return await this.problemRepository.getProblemsForContest(question)
  }
}
