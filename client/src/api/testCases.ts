import USERAPI from "@/service/axios";
import testCaseRoutes from "./endPoints/testCases";
import ADMINAPI from "@/service/adminAxios";

export const createTestCase = async(testCase: any)=> {
    try {
        const response = await USERAPI.post(testCaseRoutes.createTestCase , testCase)
    } catch (error) {
        
    }
}

export const FetchTestCases = async (problem: string | any) => {
    try {
        const response = await USERAPI.get(testCaseRoutes.testCases + problem);
        return response
    } catch (error) {
        return error
    }
}

export const findtestCase = async (testCaseId: string | any)=> {
    try {
        const response = await ADMINAPI.get(testCaseRoutes.editTestCase + testCaseId);
        return response;
    } catch (error) {
        
    }
}

export const updateTestCase = async (testCaseId: string | any)=> {
    try {
        const response = await ADMINAPI.put(testCaseRoutes.editTestCase + testCaseId);
        return response;
    } catch (error) {
        return error
    }
}

export const listTestCases = async ()=> {
    try {
        const response = await ADMINAPI.get(testCaseRoutes.listTestCases);
        return response.data
    } catch (error) {
        return error
    }
}