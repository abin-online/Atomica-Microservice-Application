import { Iotp } from "../../../../entities/otp";
import { IotpRepository } from "../../../../usecases/interface/respositoryInterface/otpRepository";
import otpModel from "../model/otpModel";


export class OtpRepository implements IotpRepository {
    constructor() {

    }
    async createOtp( email: string, otp: string): Promise<Iotp> {
        try {
            const result = await otpModel.findOneAndUpdate(
                { email },
                { email, otp },
                {
                    upsert: true,
                    new: true
                }
            );
            console.log('otp created' , result)
            setTimeout(async () => {
                if (result?._id) {
                    await otpModel.findByIdAndDelete(result._id);
                }
            }, 1200000);

            return result
        } catch (error) {
            throw error
        }
    }

    async findOtp(email: string): Promise<any | null> {
        try {
            const result = await otpModel.find({ email })
            if (result.length === 0) {
                return null
            }
            return result[0]
        } catch (error) {
            throw error
        }
    }

    async findAndDeleteUser(email: string): Promise<boolean> {
        try {
            const result = await otpModel.findOneAndDelete({ email })
            if (result) {
                if (result.otp) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } catch (error) {
            throw error
        }
    }
}