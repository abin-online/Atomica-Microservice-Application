import { ICommentRepository } from "../../application/interfaces/repositoryInterface/commentRepository";
import { IComment } from "../../domain/entities/IComment";
import Comment from "../database/mongodb/CommentModel";

export class CommentRepository implements ICommentRepository {
    async createComment(comment: IComment): Promise<IComment> {
        const createdComment = await Comment.create(comment);
        return createdComment;
    }

    async addReplyToComment(commentId: string, reply: IComment): Promise<IComment | null> {
        const comment = await Comment.findById(commentId);
        console.log(comment, commentId, reply);
    
        if (comment) {
            const updated = await Comment.findByIdAndUpdate(
                commentId,
                { $push: { replies: reply } },
                { new: true } 
            );
            console.log(updated)
            return updated;
        }
        return null; 
    }
    
}
