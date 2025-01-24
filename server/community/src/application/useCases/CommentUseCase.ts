import { IComment } from "../../domain/entities/IComment";
import { ISolutionRepository } from "../interfaces/repositoryInterface/solutionRepository";
import { ICommentRepository } from "../interfaces/repositoryInterface/commentRepository";
import { ICommentUseCase } from "../interfaces/useCaseInterface/commentUseCase";

export class CommentUseCase implements ICommentUseCase {
    private solutionRepository: ISolutionRepository;
    private commentRepository: ICommentRepository;

    constructor(
        solutionRepository: ISolutionRepository,
        commentRepository: ICommentRepository
    ) {
        this.solutionRepository = solutionRepository;
        this.commentRepository = commentRepository;
    }

    async addComment(solutionId: string, comment: IComment): Promise<IComment> {
        const newComment : any = await this.commentRepository.createComment(comment);
        await this.solutionRepository.addCommentToSolution(solutionId, newComment._id.toString());
        return newComment;
    }
}
