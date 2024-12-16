import { IotpGenerate } from "../../usecases/interface/service/otpGenerate";

export class OtpGenerate implements IotpGenerate {
    async createOtpDigit(): Promise<string> {
        let digits = '0123456789';
        let OTP = '';
        let len = digits.length
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * len)];
        }
        console.log(`Otp is here ! ${OTP}`)
        return OTP;
    }
}