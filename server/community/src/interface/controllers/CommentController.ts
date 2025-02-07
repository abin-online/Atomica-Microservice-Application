import { Next, Req, Res } from "../framework/serverTypes";
import { ReplyUseCase } from "../../application/useCases/ReplyUseCase";
import { IComment } from "../../domain/entities/IComment";
import { ICommentUseCase } from "../../application/interfaces/useCaseInterface/commentUseCase";
import { IReplyUseCase } from "../../application/interfaces/useCaseInterface/ReplyUseCase";
import ErrorHandler from "../middlewares/errorMiddleware/errorHandler";

export class CommentController {
    private CommentUseCase: ICommentUseCase;
    private ReplyUseCase: IReplyUseCase;

    constructor(
        CommentUseCase: ICommentUseCase,
        ReplyUseCase: ReplyUseCase
    ) {
        this.CommentUseCase = CommentUseCase;
        this.ReplyUseCase = ReplyUseCase;
    }

    async postComment(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const { solutionId } = req.params;
            const comment: IComment = req.body;
            const createdComment = await this.CommentUseCase.addComment(solutionId, comment);
            res.status(201).json(createdComment);   
        } catch (error : any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }

    async postReply(req: Req, res: Res, next: Next): Promise<void> {
        try {
            const { commentId } = req.params;
            const reply: IComment = req.body;
            const replied = await this.ReplyUseCase.addReply(commentId, reply);
            res.status(201).json({ message: "Reply added successfully", replied });   
        } catch (error : any) {
            return next(new ErrorHandler(error.status, error.message))
        }
    }

    

}
