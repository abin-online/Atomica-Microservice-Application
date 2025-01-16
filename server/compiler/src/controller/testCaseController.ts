import { TestCaseModel } from "../database/model/testCaseModel";

export class TestCaseController {
    async addTestcase(data: any) {
        try {
            const newTestCase = await TestCaseModel.create(data);
            //return res.json({newTestCase})
        } catch (error: any) {
            console.log(error)
        }
    }
}

