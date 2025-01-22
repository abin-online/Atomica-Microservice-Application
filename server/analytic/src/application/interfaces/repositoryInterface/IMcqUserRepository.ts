import { IUserMcq } from "../../../domain/entities/user-mcq";

export interface IMcqUserRepository {
    addUser(data : any) : Promise<IUserMcq>
}