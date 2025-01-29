import { IProblemUserRepository } from "../../application/interfaces/repositoryInterface/IProblemUserRepsitory";
import { UserProblem } from "../../domain/entities/user-problem";
import userProblemModel from "../database/models/user-problem";

export class UserProblemRepository implements IProblemUserRepository {
    async addUser(data: any): Promise<UserProblem> {
        try {
            const newUser = new userProblemModel(data);
            await newUser.save()
            return newUser
        } catch (error: any) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }
}