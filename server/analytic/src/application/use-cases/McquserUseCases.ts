import { IMcqUserRepository } from "../interfaces/repositoryInterface/IMcqUserRepository";
import { IUserMcq } from "../../domain/entities/user-mcq";
import { IMcqUserUseCase } from "../interfaces/useCaseInterfaces/IMcqUserUseCase";

export default class McqUserUseCase implements IMcqUserUseCase {
    private userRepository: IMcqUserRepository;

    constructor(userRepository: IMcqUserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(data: any): Promise<IUserMcq> {
        try {
            console.log("createuser_______>",data)
            const newUser = await this.userRepository.addUser(data);
            return newUser;
        } catch (error: any) {
            throw new Error('Error creating user: ' + error.message);
        }
    }
}
