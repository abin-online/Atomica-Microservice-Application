import { IMcqUserRepository } from "../../application/interfaces/repositoryInterface/IMcqUserRepository";
import { IUserMcq } from "../../domain/entities/user-mcq";
import userMcqModel from "../database/models/user-mcq";

export class UserMcqRepository implements IMcqUserRepository {
    async addUser(data: any): Promise<IUserMcq> {
        try {
            const newUser = new userMcqModel(data);
            await newUser.save()
            return newUser
        } catch (error: any) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }
}