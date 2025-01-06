import { ITestCaseRepository } from "../interfaces/repositoryInterfaces/testCaseInterface";
import { ITestCaseUseCase } from "../interfaces/useCaseInterface/testCaseUseCaseInterface";

export default class TestCaseUseCase implements ITestCaseUseCase{
    private testCaseRepository : ITestCaseRepository;

    constructor(testCaseRepository: ITestCaseRepository) {
         this.testCaseRepository = testCaseRepository
    }

    async addTestCase(data: any): Promise<any> {
        return this.testCaseRepository.createTestCase(data)
    }
    
    async getTestCase(id: string) :Promise<any> {
        return this.testCaseRepository.getTestCase(id)
    }

    async updateTestCase(id: string,data: any ): Promise<any> {
        return this.testCaseRepository.updateTestCase(id, data)
    }

    async getTestCases(): Promise <any> {
        return this.testCaseRepository.getTestCases()
    }
}

