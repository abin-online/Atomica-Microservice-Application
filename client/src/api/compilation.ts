import API from "@/service/axios";
import compiler from "./endPoints/compilation";

export const submitCode = async (code: any, language: string, )=> {
    try {
        console.log(code, language)
        const data = JSON.stringify({code, language})
        const response = await API.post(compiler.run, data );
        return response
    } catch (error) {
        
    }
}