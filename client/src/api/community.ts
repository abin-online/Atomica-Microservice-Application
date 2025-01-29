import USERAPI from "@/service/axios";
import { community } from "./endPoints/community";

export const postSolution = async (formData: any) => {
    try {
        const response = await USERAPI.post(community.postSolution, formData);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getSolutions = async (problem: string) => {
    try {
        const response = await USERAPI.get(community.getSolutions + problem);
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const postComment = async (solutionId: string, author: string,  text: string) => {
    try {
        const response = await USERAPI.post(`${community.postComment}${solutionId}/comments`, { author, text });
        return response;
    } catch (error) {
        console.log(error)
    }
}

export const like = async (solutionId: string, author: string, ) => {
    try {
        const response = await USERAPI.post(`${community.like}${solutionId}/` , {author})
        return response;
    } catch (error) {
        console.log(error)
    }
}