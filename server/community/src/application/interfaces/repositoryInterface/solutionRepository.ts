import { ISolution } from "../../../domain/entities/ISolution";

export interface ISolutionRepository {
    createSolution(solution: ISolution): Promise<ISolution>;
    like(solutionId: string, author: string): Promise<any>
    getSolutions(problem: string): Promise<ISolution[] | []>;
    addCommentToSolution(solutionId: string, commentId: string): Promise<void>;
}
