import { IContest } from "../../domain/entities/IContest";
import { IContestRepository } from "../interface/repository/ContestRepository";
import { IContestUseCase } from "../interface/useCase/ContestUseCase";

export class ContestUseCase implements IContestUseCase {
    private contestRepository: IContestRepository;

    constructor(
        contestRepository: IContestRepository
    ) {
        this.contestRepository = contestRepository
    }

    async createContest(contest: IContest): Promise<IContest> {
        const newContest = await this.contestRepository.createContest(contest);
        return newContest
    }

    async editContest(id : string, contest: any): Promise<IContest> {
        const updatedContest = await this.contestRepository.editContest(id, contest);
        return updatedContest
    }

    async listContests(): Promise<IContest[]> {
        const listContest = await this.contestRepository.listContests();
        return listContest
    }

    async getContest(id: string): Promise<any> {
        const contest = await this.contestRepository.getContest(id);
        return contest
    }
}

