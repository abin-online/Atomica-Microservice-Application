import { ISolution } from "../../domain/entities/ISolution";
import { ISolutionRepository } from "../interfaces/repositoryInterface/solutionRepository";
import { ISolutionUseCase } from "../interfaces/useCaseInterface/solutionUseCaseInterface";

export class SolutionUseCase implements ISolutionUseCase {
    private solutionRepository: ISolutionRepository;

    constructor(solutionRepository: ISolutionRepository) {
        this.solutionRepository = solutionRepository;
    }

    async createSolution(solution: ISolution): Promise<ISolution> {
        return await this.solutionRepository.createSolution(solution);
    }

    async getSolutions(problem: string): Promise<ISolution[] | []> {
        return await this.solutionRepository.getSolutions(problem)
    }

    async likeSolution(solutionId: string, author: string): Promise<void> {
        return await this.solutionRepository.like(solutionId, author)
    }
}
