import { log } from "console";
import { ISolutionRepository } from "../../application/interfaces/repositoryInterface/solutionRepository";
import { ISolution } from "../../domain/entities/ISolution";
import Solution from "../database/mongodb/SolutionModel";

export class SolutionRepository implements ISolutionRepository {
    async createSolution(solution: ISolution): Promise<ISolution> {
        const createdSolution = await Solution.create(solution);
        return createdSolution;
    }

    async getSolutions(problem: string): Promise<ISolution[] | []> {
        const solution: any = await Solution.find({ problem }).populate('comments');
        log("solution______", solution[0].comments)
        return solution
    }

    async addCommentToSolution(solutionId: string, commentId: any): Promise<void> {
        const solution = await Solution.findById(solutionId);
        if (solution) {
            solution.comments.push(commentId);
            await solution.save();
        }
    }

    async like(solutionId: string, author: string): Promise<any> {
        const solution = await Solution.findById(solutionId);

        if (!solution) {
            throw new Error("Solution not found");
        }

        const isLiked = solution.upvotes.includes(author);

        if (isLiked) {

            const response = await Solution.findByIdAndUpdate(
                solutionId,
                { $pull: { upvotes: author } },
                { new: true }
            );
            return response
        } else {

            const response = await Solution.findByIdAndUpdate(
                solutionId,
                { $addToSet: { upvotes: author } },
                { new: true }
            );
            return response
        }
    }

}
