import { IContestRepository } from "../../application/interface/repository/ContestRepository";
import { IContest } from "../../domain/entities/IContest";
import Contest from "../database/mongodb/contestModel";

export class ContestRepository implements IContestRepository {
    async createContest(contest: IContest): Promise<IContest> {
        return await Contest.create(contest)
    }

    async editContest(id: string, contest: any): Promise<any> {
        return await Contest.findByIdAndUpdate(id, contest )
    }

    async listContests(): Promise<IContest[]> {
        return await Contest.find()
    }

    async getContest(id: string): Promise<IContest | null> {
        return await Contest.findById(id)
    }
}
