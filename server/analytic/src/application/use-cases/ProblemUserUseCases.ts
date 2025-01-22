import { UserProblem } from "../../domain/entities/user-problem";
import { IProblemUserRepository } from "../interfaces/repositoryInterface/IProblemUserRepsitory";
import { IProblemUserUseCase } from "../interfaces/useCaseInterfaces/IProblemUserUseCase";

export default class ProblemUserUseCase implements IProblemUserUseCase {
    private userRepository: IProblemUserRepository;

    constructor(userRepository: IProblemUserRepository) {
        this.userRepository = userRepository;
    }

    async createUser(data: any): Promise<UserProblem> {
        try {
            console.log("createuser______for problems_>",data)
            const newUser = await this.userRepository.addUser(data);
            return newUser;
        } catch (error: any) {
            throw new Error('Error creating user: ' + error.message);
        }
    }
}
