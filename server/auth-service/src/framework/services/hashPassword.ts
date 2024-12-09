import { IhashPassword } from "../../usecases/interface/service/hashPassword";
import bcrypt from 'bcryptjs';

export class Encrypt implements IhashPassword{
   
    async createHash(password: string): Promise<string> {
        const hashPassword = await bcrypt.hash(password,10)
        return hashPassword
    }
    async compareHashPassword(password: string, hashPassword: string): Promise<boolean> {
        const compare = await bcrypt.compare(password, hashPassword)
        return compare
    }
}