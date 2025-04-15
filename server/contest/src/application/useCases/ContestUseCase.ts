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

    async listContests(username : string): Promise<IContest[]> {
        const listContest = await this.contestRepository.listContests(username);
        return listContest
    }

    async getContest(id: string): Promise<any> {
        const contest = await this.contestRepository.getContest(id);
        return contest
    }

    async updateResult(contestId: string, formData: any): Promise<any> {
        const result = await this.contestRepository.updateResult(contestId, formData )
        return result
    }

    async getContestData(user: string): Promise<any> {
        console.log("user  =>", user)
        const userData = await this.contestRepository.contestData(user)
        
        return userData
    }

    async userList(): Promise<any> {
        const data = await this.contestRepository.userList()
        return data
    }
}

