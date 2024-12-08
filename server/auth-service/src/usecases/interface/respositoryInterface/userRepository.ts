import { Iuser } from "../../../entities/user";

export interface IuserRepository {
    createUser(newUser: Iuser) : Promise <Iuser>
    findByEmail(email: string) : Promise <Iuser | void>
    signup(email: string) : Promise <string>
}