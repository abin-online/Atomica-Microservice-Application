import { Iotp } from "../../../../entities/otp";
import { IotpRepository } from "../../../../usecases/interface/respositoryInterface/otpRepository";
import otpModel from "../model/otpModel";


export class OtpRepository implements IotpRepository {
    constructor() {
        
    }
    async createOtp(email: string, otp: string): Promise<Iotp> {
        try {
            const result = await otpModel.create({ email, otp })
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

    async findAndDeleteUser(email: string, otp: string): Promise<boolean> {
        try {
            const checking = await otpModel.findOne({ email })
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

    async resendOtp(email: string, otp: string): Promise<void> {
        try {
            const resend = await otpModel.updateOne({ email: email }, { otp: otp }, { upsert: true })
            return
        } catch (error) {
            throw error
        }
    }
}