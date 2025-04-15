import { IContest } from "../../../domain/entities/IContest";

export interface IContestRepository {
    createContest(contest: IContest) : Promise<IContest>
    editContest(id: string, contest: any): Promise<IContest>
    listContests(username : string): Promise<IContest[]>
    getContest(id: string): Promise<IContest | null>
    updateResult(contestId: string, formData: any) : Promise<any>
    contestData(user : string) : Promise<any[]>
    userList(): Promise<any>
    
}   