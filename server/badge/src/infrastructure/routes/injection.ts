import { BadgeRepository } from "../repositories/badgeRepository";
import BadgeUseCase from "../../application/use-cases/badgeUseCase";
import { BadgeController } from "../../interface/controllers/badgeController";
import { IBadgeRepository } from "../../application/interfaces/repositoryInterface/IBadgeRepository";





import { IMcqUserUseCase } from "../../application/interfaces/useCaseInterfaces/IMcqUserUseCase";
import { IMcqUserRepository } from "../../application/interfaces/repositoryInterface/IMcqUserRepository";
import McqUserUseCase from "../../application/use-cases/McquserUseCases";
import { UserMcqRepository } from "../repositories/userMcqRepository";
import { UserController } from "../../interface/controllers/McqUserController";
import { IProblemUserRepository } from "../../application/interfaces/repositoryInterface/IProblemUserRepsitory";
import { UserProblemRepository } from "../repositories/userProblemRepository";
import { IProblemUserUseCase } from "../../application/interfaces/useCaseInterfaces/IProblemUserUseCase";
import ProblemUserUseCase from "../../application/use-cases/ProblemUserUseCases";
import { UserProblemController } from "../../interface/controllers/userProblemController";
import { ProfileController } from "../../interface/controllers/ProfileController";

const badgeRepository: IBadgeRepository = new BadgeRepository();
const badgeUseCase = new BadgeUseCase(badgeRepository);
const badgeController = new BadgeController( badgeUseCase);


const userMcqRepository : IMcqUserRepository = new UserMcqRepository();
const mcqUserUseCase : IMcqUserUseCase = new McqUserUseCase(userMcqRepository);
const mcqUserService = mcqUserUseCase;
const userController = new UserController(mcqUserUseCase)

const userProblemRepository : IProblemUserRepository = new UserProblemRepository();
const userProblemUseCase : IProblemUserUseCase = new ProblemUserUseCase(userProblemRepository);
const userProblemService = userProblemUseCase

const userProblemController = new UserProblemController(userProblemService)

const profileController = new ProfileController()

// Export the Badge Controller
export {
    badgeController,
    mcqUserService,
    userController,
    userProblemService,
    userProblemController,
    profileController
};
