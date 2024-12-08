import { Iotp } from "../../../entities/otp";
export interface IotpRepository {
    createOtp(email: string, otp : string) : Promise<Iotp>
    findOtp(email: string) : Promise<Iotp | null>
    find
}