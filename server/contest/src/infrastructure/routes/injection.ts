import { ContestController } from "../../interface/controllers/ContestController";
import { ContestUseCase } from "../../application/useCases/ContestUseCase";
import { ContestRepository } from "../repositories/ContestRepository";

import { IContestRepository } from "../../application/interface/repository/ContestRepository";
import { IContestUseCase } from "../../application/interface/useCase/ContestUseCase";


const contestRepository: IContestRepository = new ContestRepository();
const contestUseCase: IContestUseCase = new ContestUseCase(contestRepository);
const contestController = new ContestController(contestUseCase);

export {
    contestController
}