import { Iuser } from "../../../../../entities/user";
import { IuserRepository } from "../../../../../usecases/interface/respositoryInterface/userRepository";
import userModel from "../../model/userModel";
import {block, createUser, findByEmail, getAllUser, getUser} from './user/index';

export class UserRepository implements IuserRepository {
    constructor(
        private userModels: typeof userModel
    ){}

    async blockUser(id: string) : Promise <Iuser | void> {
        console.log("user repo =>",id)
        return await block(id, this.userModels)
    }

    async createUser(newUser: Iuser): Promise<Iuser> {
        return await createUser(newUser, this.userModels)
    }

    async findByEmail(email: string): Promise<Iuser | void> {
        return await findByEmail(this.userModels, email)
    }

    async signup(email: string): Promise<string> {
        return 'signed up'
    }

    async getAllUser(): Promise<Iuser[] | void> {
        return await getAllUser(this.userModels)
    }

    async getUser(id: string): Promise<Iuser | undefined> {
        return await getUser(this.userModels, id)
    }

    
}