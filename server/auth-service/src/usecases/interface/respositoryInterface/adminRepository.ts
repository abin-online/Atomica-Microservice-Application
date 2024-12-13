import { Iadmin } from "../../../entities/admin";

export interface IadminRepository{
    findAdmin(email:string) :Promise <Iadmin|void>
}