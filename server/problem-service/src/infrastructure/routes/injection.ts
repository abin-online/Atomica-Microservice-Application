import ProblemController from "../../interface/controllers/problemController";
import ProblemUseCase from "../../application/useCases/problemUseCases";
import ProblemRepository from "../repositories/problemRepositories";
import { IProblemUseCase } from "../../application/interfaces/useCaseInterface/problemUseCaseInterface";
import { IProblemRepository } from "../../application/interfaces/repositoryInterfaces/problemRepositoryInterfaces";
import TagUseCase from "../../application/useCases/tagUseCase";
import TagRepository from "../repositories/tagRepository";
import { ITagUseCase } from "../../application/interfaces/useCaseInterface/tagUseCaseInterface";
import { ITagRepository } from "../../application/interfaces/repositoryInterfaces/tagRepositoryInterfaces";


// Instantiate the repository (data layer)
const problemRepository: IProblemRepository = new ProblemRepository(); // Pass required dependencies if any

// Instantiate the use case (business logic layer)
const problemUseCase: IProblemUseCase = new ProblemUseCase(problemRepository);

const tagRepository: ITagRepository = new TagRepository()
const tagUseCase: ITagUseCase = new TagUseCase(tagRepository)

// Instantiate the controller
const problemController = new ProblemController(problemUseCase);
const tagService = tagUseCase

export {
    problemController,
    tagService
};
