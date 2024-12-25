import McqController from "../../interface/controllers/mcqController";
import TagController from "../../interface/controllers/tagController";
import McqUseCase from "../../application/usecases/mcqUseCase";
import McqRepository from "../repositories/mcqRepositories";
import { IMcqUseCase } from "../../application/interfaces/useCaseInterfaces/mcqUseCaseInterface";
import { ITagUseCase } from "../../application/interfaces/useCaseInterfaces/tagUseCaseInterface";
import { TagRepository } from "../repositories/tagRepositories";
import TagUseCase from "../../application/usecases/tagUseCases";
import { IMcqRepository } from "../../application/interfaces/repositoryInterfaces/testRepositoryInterface";

// Instantiate the repository (data layer)
const mcqRepository: IMcqRepository = new McqRepository(); // Pass required dependencies if any
const tagRepository = new TagRepository()

// Instantiate the use case (business logic layer)
const mcqUseCase: IMcqUseCase = new McqUseCase(mcqRepository);
const tagUseCase: ITagUseCase = new TagUseCase(tagRepository)

// Instantiate the controllers
const mcqController = new McqController(mcqUseCase);
const tagController = new TagController(tagUseCase);

export {
    mcqController,
    tagController,
};
