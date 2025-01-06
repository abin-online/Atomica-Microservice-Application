import { ITestCaseRepository } from "../../application/interfaces/repositoryInterfaces/testCaseInterface";
import { TestCaseModel } from "../database/mongodb/testCase";

export default class TestCaseRepository implements ITestCaseRepository {
    async createTestCase(data: any) : Promise<any> {
        const newTestCase = new TestCaseModel(data);
        return await newTestCase.save()
    }

    async getTestCase(id: string): Promise<any> {
        const testCase = await TestCaseModel.findById(id);
        return await testCase
    }

    async updateTestCase(id: string, data: any): Promise<any> {
        const testCase =await  TestCaseModel.findByIdAndUpdate(id, data);
        return await testCase;
    }
    
    async getTestCases(): Promise<any> {
        const testCases = await TestCaseModel.find()
        console.log(testCases)
        return await testCases;
    }
}
