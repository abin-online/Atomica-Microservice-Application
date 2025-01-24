import { IComment } from "../../../domain/entities/IComment";

export interface IReplyUseCase {
    addReply(commentId: string, solution: IComment): Promise<IComment>
}