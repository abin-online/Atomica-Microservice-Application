import { UserProblem } from "../../../domain/entities/user-problem"

export interface IProblemUserRepository {
    addUser(data : any) : Promise<UserProblem>
}