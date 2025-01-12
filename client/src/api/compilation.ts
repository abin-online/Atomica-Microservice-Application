import compiler from "./endPoints/compilation";
import USERAPI from "@/service/axios";

export const submitCode = async (code: any, problem: string, language: string, )=> {
    try {
        console.log(code, language)
        const data = JSON.stringify({code, problem, language})
        const response = await USERAPI.post(compiler.submit, data );
        return response
    } catch (error) {
        
    }
}

export const runCode = async (code: any, problem: string, language: string, )=> {
    try {
        console.log(code, language)
        const data = JSON.stringify({code, problem, language})
        const response = await USERAPI.post(compiler.run, data );
        return response
    } catch (error) {
        
    }
}