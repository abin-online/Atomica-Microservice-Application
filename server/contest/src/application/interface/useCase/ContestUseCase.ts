import { IContest } from "../../../domain/entities/IContest";

export interface IContestUseCase {
    createContest(contest: IContest): Promise<IContest>
    editContest(id: string, contest: any): Promise<IContest>
    listContests(username: string): Promise<IContest[]>
    adminlistContests() : Promise<IContest[]>
    getContest(id: string): Promise<IContest>
    updateResult(contestId: string, formData: any) : Promise<any>
    getContestData(user: string) : Promise<any[]>
    userList() : Promise<any>
}
