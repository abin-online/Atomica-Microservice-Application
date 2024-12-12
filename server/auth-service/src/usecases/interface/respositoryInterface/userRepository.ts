import { Iuser } from "../../../entities/user";

export interface IuserRepository {
    createUser(newUser: Iuser) : Promise <Iuser>
    findByEmail(email: string) : Promise <Iuser | void>
    signup(email: string) : Promise <string>
    getAllUser():Promise<Iuser[]|void>
    blockUser(id:string):Promise<Iuser|void>
    getUser(id:string):Promise<Iuser|undefined>
}