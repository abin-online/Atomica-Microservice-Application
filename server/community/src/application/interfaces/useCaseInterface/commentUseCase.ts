import { IComment } from "../../../domain/entities/IComment"

export interface ICommentUseCase {
    addComment(solutionId: string, comment: IComment): Promise<IComment>
}