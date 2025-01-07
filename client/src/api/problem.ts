import API from "@/service/axios";
import problemRoutes from "./endPoints/problem";

export const getAllProblems = async ()=> {
    try {
        const response = await API.get(problemRoutes.getAllProblems);
        return response
    } catch (error) {
        return error
    }
}

export const blockProblem = async (problemId: string, blocked: boolean)=> {
    try {
        const response = await API.put(problemRoutes.blockProblem, {problemId, blocked})
    } catch (error) {
        return error
    }
}

export const createProblem = async (formData: any) => {
    try {
        const response = await API.post(problemRoutes.addProblem, formData)
        return response
    } catch (error) {
        return error
    }
}

export const getProblem = async(problemId : string) => {
    try {
        const response = await API.get(problemRoutes.getProblem + problemId);
        return response
    } catch (error) {
        
    }
}

export const getUnblockedProblems = async() => {
    try {
        const response = await API.get(problemRoutes.getProblems);
        return response
    } catch (error) {
        
    }
}