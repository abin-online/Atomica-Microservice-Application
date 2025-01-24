import { IComment } from "../../domain/entities/IComment";
import { ICommentRepository } from "../interfaces/repositoryInterface/commentRepository";
import { IReplyUseCase } from "../interfaces/useCaseInterface/ReplyUseCase";

export class ReplyUseCase implements IReplyUseCase{
    private commentRepository: ICommentRepository;

    constructor(commentRepository: ICommentRepository) {
        this.commentRepository = commentRepository;
    }

    async addReply(commentId: string, reply: IComment): Promise<any> {
        await this.commentRepository.addReplyToComment(commentId, reply);
    }
}
