export interface IProblemUseCase {
    createProblem(data: any): Promise<any>;
    updateProblem(id: string, data: any): Promise<any>;
    blockProblem(problemId: string, blocked: boolean): Promise<any>;
    getProblemById(id: string): Promise<any>;
    getAllProblems(): Promise<any[]>;
    getAllTags(): Promise<any[]>;
    getProblems(): Promise<any[]>
  }
  