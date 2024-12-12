import { UserController } from "../../../../controller/userController";
import { UserUseCase } from "../../../../usecases/usecases/userUseCase";
import { AdminController } from '../../../../controller/adminController';
import { AdminUseCase } from '../../../../usecases/usecases/adminUseCase';
import { Encrypt } from "../../../services/hashPassword";
import { SentEmail } from "../../../services/sendEmail";
import { OtpRepository } from "../../../database/mongodb/repository/otpRepository";
import { OtpGenerate } from "../../../services/otpGenerator";
import { JWTtoken } from "../../../services/jwt";
import { UserRepository } from "../../../database/mongodb/repository/userRepository/userRepository";
import userModel from "../../../database/mongodb/model/userModel";
import { AdminRepository } from '../../../database/mongodb/repository/adminRepository/adminRepository';
import adminModel from '../../../database/mongodb/model/admin';



const bcryptService = new Encrypt()
const sentEmail = new SentEmail()
const otpRepository = new OtpRepository()
const generateOtp = new OtpGenerate()
const jwtToken = new JWTtoken()
const userRepository = new UserRepository(userModel)
const adminRepository = new AdminRepository(adminModel)

const userusecase = new UserUseCase(userRepository, jwtToken, generateOtp, otpRepository, sentEmail, bcryptService)
const userController = new UserController(userusecase)
const adminusecase = new AdminUseCase(adminRepository, bcryptService, jwtToken, userRepository)
const adminController = new AdminController(adminusecase)



export {
    userController,
    adminController
}