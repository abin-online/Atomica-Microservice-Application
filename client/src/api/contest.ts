import ADMINAPI from "@/service/adminAxios"
import { contest } from "./endPoints/contest"
import USERAPI from "@/service/axios"

export const createContest = async (formData: any) => {
    try {
        const response = await ADMINAPI.post(contest.createContest, formData)
        return response
    } catch (error) {
        console.log(error)
    }
}

export const listContest = async () => {
    try {
        const response = await ADMINAPI.get(contest.listContest);
        return response
    } catch (error) {
        console.log(error)
    }
}

export const getContestById = async (solutionId: string) => {
    try {
        const response = await USERAPI.get(contest.contestById + solutionId);
        return response
    } catch (error) {
        console.log(error)
    }
}

export const updateContest = async (contestId: string, formData: any) => {
    try {
        const response = await ADMINAPI.put(contest.updateContest+contestId, formData);
        console.log("response => ", response)
        return response
    } catch (error) {

    }
}

export const showContest = async()=> {
    try {
        const response = await USERAPI.get(contest.getContests);
        return response
    } catch (error) {
        
    }
}

export const getMCQForContest = async(question: any)=> {
    try {
        const response = await USERAPI.post(contest.getMCQForContest, {question} );
        return response
    } catch (error) {
        
    }
}

export const getProblemsForContest = async(question: any)=> {
    try {
        const response = await USERAPI.post(contest.getProblemsForContest, {question} );
        return response
    } catch (error) {
        
    }
}

export const updateResult = async(solutionId : string, formData: any) => {
    try {
        const response = await USERAPI.post(contest.updateResult+solutionId, formData);
        return response
    } catch (error) {
        
    }
}

export const getUserContestData = async(username : string) => {
    try {
        const response = await USERAPI.post(contest.getUserContestData, { username });
        return response
    } catch (error) {
        console.log(error)
    }
}

export const userList = async() => {
    try {
        const response = await ADMINAPI.get(contest.dashboardUserListing);
        return response
    } catch (error) {
        console.log(error)
    }
}