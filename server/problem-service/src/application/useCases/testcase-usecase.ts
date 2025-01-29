import produce from "../../infrastructure/messaging/kafka/producer";
import { ITestCaseRepository } from "../interfaces/repositoryInterfaces/testCaseInterface";
import { ITestCaseUseCase } from "../interfaces/useCaseInterface/testCaseUseCaseInterface";

export default class TestCaseUseCase implements ITestCaseUseCase {
    private testCaseRepository: ITestCaseRepository;

    constructor(testCaseRepository: ITestCaseRepository) {
        this.testCaseRepository = testCaseRepository
    }

    async addTestCase(data: any): Promise<any> {
        await produce('add-testCase', data);
        return this.testCaseRepository.createTestCase(data)
            //-----------------------------------------------
        //kafka produce |
            //-----------------------------------------------

    }

    async getTestCase(id: string): Promise<any> {
        console.log("get test case____",id)
        const test = 
         await this.testCaseRepository.getTestCase(id)
         console.log('test case use' , test)
         return test
    }

    async updateTestCase(id: string, data: any): Promise<any> {
        return await this.testCaseRepository.updateTestCase(id, data)
    }

    async getTestCases(): Promise<any> {
        return await this.testCaseRepository.getTestCases()
    }

    async publicTestCases(problem: string) : Promise<any> {
        return await this.testCaseRepository.publicTestCases(problem)
    }
}

