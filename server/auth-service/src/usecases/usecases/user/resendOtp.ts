import { Next } from "../../../framework/types/serverTypes";
import { IotpRepository } from "../../interface/respositoryInterface/otpRepository";
import ErrorHandler from "../../middlewares/errorHandler";
import { IuserRepository } from "../../interface/respositoryInterface/userRepository";
import { catchError } from "../../middlewares/catchError";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { IsentEmail } from "../../interface/service/sentEmail";

export const resendOtp = async ( otpRepository: IotpRepository, userRepository: IuserRepository,otpGenerate: IotpGenerate,sentEmail: IsentEmail,email: string,next: Next
): Promise<string | void> => {
  try {
    console.log('resendingggggg')
    console.log(email)
    // const user = await userRepository.findByEmail(email);

    // if (!user) {
    //   return next(new ErrorHandler(404, "User not found"));
    // }

    const newOtp = await otpGenerate.createOtpDigit();
    await otpRepository.createOtp(email, newOtp)
    await sentEmail.sentEmailVerification("", email, newOtp);

    return "OTP resented";
  } catch (error) {
    catchError(error, next);
  }
};
