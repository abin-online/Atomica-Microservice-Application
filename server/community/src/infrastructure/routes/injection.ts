import { SolutionController } from "../../interface/controllers/SolutionControllers";
import { CommentController } from "../../interface/controllers/CommentController";
import { SolutionUseCase } from "../../application/useCases/SolutionUseCases";
import { CommentUseCase } from "../../application/useCases/CommentUseCase";
import { SolutionRepository } from "../repositories/SolutionRepositories";
import { CommentRepository } from "../repositories/CommentRepositories";
import { ReplyUseCase } from "../../application/useCases/ReplyUseCase";

const solutionRepository = new SolutionRepository();
const commentRepository = new CommentRepository();

const solutionUseCase = new SolutionUseCase(solutionRepository);
const commentUseCase = new CommentUseCase(solutionRepository, commentRepository);
const replyUseCase = new ReplyUseCase(commentRepository)

const solutionController = new SolutionController(solutionUseCase);
const commentController = new CommentController(commentUseCase, replyUseCase);

export {
    solutionController,
    commentController
}
