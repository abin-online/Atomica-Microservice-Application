import { ISolution } from "../../../domain/entities/ISolution";

export interface ISolutionUseCase {
    createSolution(solution: ISolution): Promise<ISolution>
    getSolutions(problem: string) : Promise<ISolution[] | []>
}