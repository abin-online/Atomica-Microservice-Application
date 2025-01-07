import API from "@/service/axios";
import quickTestRoutes from "./endPoints/quickTest";

export const getAllQuestions = async () => {
    try {
        const response = await API.get(quickTestRoutes.getAllQuestions)
        console.log(response)

        return response.data
    } catch (error: any) {
        return error
    }
}

export const blockQuestion = async (questionId : string ,blocked : boolean) => {
    try {
        const response = await API.put(quickTestRoutes.blockQuestion, {questionId, blocked} )
        console.log(response)

        return response
    } catch (error: any) {
        return error
    }
}

export const createQuickTest = async (formData: any)=> {
    try {
        const response = await API.post(quickTestRoutes.createQuickTest, formData )
        return response
    } catch (error: any) {
        return error
    }
}

export const getQuickTest = async(questionId : string) => {
    try {
        const response = await API.get(quickTestRoutes.getQuickTest + questionId)
        return response.data
    } catch (error) {
        return error
    }
}

export const updateQuestion = async(questionId : string , formData: any) => {
    try {
        const response = await API.put(quickTestRoutes.updateQuestion + questionId , formData)
        return response
    } catch (error) {
        
    }
}

