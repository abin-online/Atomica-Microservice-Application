import { UserProblem } from "../../../domain/entities/user-problem"

export interface IProblemUserUseCase {
    createUser(data: any) : Promise <UserProblem>
}