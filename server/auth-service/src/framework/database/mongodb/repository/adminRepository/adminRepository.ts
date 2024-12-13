import { Iadmin } from "../../../../../entities/admin";
import { IadminRepository } from "../../../../../usecases/interface/respositoryInterface/adminRepository";
import adminModel from "../../model/admin";
import { findbyEmail } from "./admin/index";

export class AdminRepository implements IadminRepository {
    constructor(private adminModels: typeof adminModel) { }
    async findAdmin(email: string): Promise<Iadmin | void> {
        return await findbyEmail(this.adminModels, email);
    }

}