import { IContest } from "../../../domain/entities/IContest";

export interface IContestRepository {
    createContest(contest: IContest) : Promise<IContest>
    editContest(id: string, contest: any): Promise<IContest>
    listContests(): Promise<IContest[]>
    getContest(id: string): Promise<IContest | null>
}