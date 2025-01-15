import ADMINAPI from "@/service/adminAxios";
import problemRoutes from "./endPoints/problem";
import USERAPI from "@/service/axios";

export const getAllProblems = async ()=> {
    try {
        const response = await ADMINAPI.get(problemRoutes.getAllProblems);
        return response
    } catch (error) {
        return error
    }
}

export const blockProblem = async (problemId: string, blocked: boolean)=> {
    try {
        const response = await ADMINAPI.put(problemRoutes.blockProblem, {problemId, blocked})
    } catch (error) {
        return error
    }
}

export const createProblem = async (formData: any) => {
    try {
        const response = await ADMINAPI.post(problemRoutes.addProblem, formData)
        return response
    } catch (error) {
        return error
    }
}

export const getProblem = async(problemId : string) => {
    try {
        const response = await ADMINAPI.get(problemRoutes.getProblem + problemId);
        return response
    } catch (error) {
        
    }
}

export const viewProblem = async(problemId : string) => {
    try {
        const response = await USERAPI.get(problemRoutes.viewProblem + problemId);
        return response
    } catch (error) {
        return error
    }
}

export const getUnblockedProblems = async() => {
    try {
        const response = await ADMINAPI.get(problemRoutes.getProblems);
        return response
    } catch (error) {
        
    }
}

export const updateProblem = async (id : string, data: any)=> {
    try {
        const response  = await ADMINAPI.put(problemRoutes.updateProblem + id , data );
        return response
    } catch (error) {
        return error
    }
}