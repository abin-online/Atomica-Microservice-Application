import { IUserMcq } from "../../../domain/entities/user-mcq";

export interface IMcqUserUseCase {
    createUser(data: any) : Promise <IUserMcq>
}