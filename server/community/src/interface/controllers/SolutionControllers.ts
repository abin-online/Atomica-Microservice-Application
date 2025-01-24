import { Next, Req, Res } from "../framework/serverTypes";
import { ISolution } from "../../domain/entities/ISolution";
import { ISolutionUseCase } from "../../application/interfaces/useCaseInterface/solutionUseCaseInterface";

export class SolutionController {
    private SolutionUseCase: ISolutionUseCase;

    constructor(SolutionUseCase: ISolutionUseCase) {
        this.SolutionUseCase = SolutionUseCase;

        this.postSolution = this.postSolution.bind(this)
    }

    async postSolution(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const solution: ISolution = req.body;
            console.log("solution ", solution)
            const createdSolution = await this.SolutionUseCase.createSolution(solution);
            res.status(201).json(createdSolution);
        } catch (error) {
            next(error);
        }
    }

    async getSolutions(req: Req, res: Res, next: Next): Promise<any> {
        try {
            const { problem } = req.params;
            const solutions = await this.SolutionUseCase.getSolutions(problem);
            res.status(201).json(solutions);
        } catch (error) {
            next(error)
        }
    }
}
