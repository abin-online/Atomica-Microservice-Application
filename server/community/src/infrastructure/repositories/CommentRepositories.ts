import { ICommentRepository } from "../../application/interfaces/repositoryInterface/commentRepository";
import { IComment } from "../../domain/entities/IComment";
import Comment from "../database/mongodb/CommentModel";

export class CommentRepository implements ICommentRepository {
    async createComment(comment: IComment): Promise<IComment> {
        const createdComment = await Comment.create(comment);
        return createdComment;
    }

    async addReplyToComment(commentId: string, reply: IComment): Promise<void> {
        const comment = await Comment.findById(commentId);
        if (comment) {
            comment.replies.push(reply);
            await comment.save();
        }
    }
}
