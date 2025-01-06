import ProblemController from "../../interface/controllers/problemController";
import ProblemUseCase from "../../application/useCases/problemUseCases";
import ProblemRepository from "../repositories/problemRepositories";
import { IProblemUseCase } from "../../application/interfaces/useCaseInterface/problemUseCaseInterface";
import { IProblemRepository } from "../../application/interfaces/repositoryInterfaces/problemRepositoryInterfaces";
import TagUseCase from "../../application/useCases/tagUseCase";
import TagRepository from "../repositories/tagRepository";
import { ITagUseCase } from "../../application/interfaces/useCaseInterface/tagUseCaseInterface";
import { ITagRepository } from "../../application/interfaces/repositoryInterfaces/tagRepositoryInterfaces";
import { ITestCaseRepository } from "../../application/interfaces/repositoryInterfaces/testCaseInterface";
import TestCaseRepository from "../repositories/testCaseRepository";
import { ITestCaseUseCase } from "../../application/interfaces/useCaseInterface/testCaseUseCaseInterface";
import TestCaseUseCase from "../../application/useCases/testcase-usecase";
import TestCaseController from "../../interface/controllers/testCaseController";


// Instantiate the repository (data layer)
const problemRepository: IProblemRepository = new ProblemRepository(); // Pass required dependencies if any

// Instantiate the use case (business logic layer)
const problemUseCase: IProblemUseCase = new ProblemUseCase(problemRepository);

const tagRepository: ITagRepository = new TagRepository()
const tagUseCase: ITagUseCase = new TagUseCase(tagRepository)

// Instantiate the controller
const problemController = new ProblemController(problemUseCase);
const tagService = tagUseCase

const testCaseRepository : ITestCaseRepository = new TestCaseRepository();

const testCaseUseCase: ITestCaseUseCase = new TestCaseUseCase(testCaseRepository);

const testCaseController = new TestCaseController(testCaseUseCase);

export {
    problemController,
    tagService,
    testCaseController
};
