import { BadgeRepository } from "../repositories/badgeRepository";
import BadgeUseCase from "../../application/use-cases/badgeUseCase";
import { BadgeController } from "../../interface/controllers/badgeController";
import { IBadgeRepository } from "../../application/interfaces/repositoryInterface/IBadgeRepository";





import { IMcqUserUseCase } from "../../application/interfaces/useCaseInterfaces/IMcqUserUseCase";
import { IMcqUserRepository } from "../../application/interfaces/repositoryInterface/IMcqUserRepository";
import McqUserUseCase from "../../application/use-cases/McquserUseCases";
import { UserMcqRepository } from "../repositories/userMcqRepository";
import { UserController } from "../../interface/controllers/McqUserController";

const badgeRepository: IBadgeRepository = new BadgeRepository();
const badgeUseCase = new BadgeUseCase(badgeRepository);
const badgeController = new BadgeController( badgeUseCase);


const userMcqRepository : IMcqUserRepository = new UserMcqRepository();
const mcqUserUseCase : IMcqUserUseCase = new McqUserUseCase(userMcqRepository);
const mcqUserService = mcqUserUseCase;
const userController = new UserController(mcqUserUseCase)

// Export the Badge Controller
export {
    badgeController,
    mcqUserService,
    userController
};
