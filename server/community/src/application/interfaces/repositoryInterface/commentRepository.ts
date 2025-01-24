import { IComment } from "../../../domain/entities/IComment";

export interface ICommentRepository {
    createComment(comment: IComment): Promise<IComment>;
    addReplyToComment(commentId: string, reply: IComment): Promise<void>;
}
