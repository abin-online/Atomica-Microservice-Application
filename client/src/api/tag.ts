import API from "@/service/axios";
import tagRoutes from "./endPoints/tags";

export const getAllTags = async () => {
    try {
        const response = await API.get(tagRoutes.fetchTag)
        return response
    } catch (error) {
        return error
    }
}

export const getTagsFromProblems = async ()=> {
    try {
        const response = await API.get(tagRoutes.getTagsFromProblems);
        return response
    } catch (error) {
        return error
    }
}

export const blockTag = async (tag: string, blocked: boolean) => {
    try {
        const response = await API.put(tagRoutes.blockTag, {tag, blocked})
    } catch (error) {
        return error
    }
}

export const createTag = async (tag: string) =>{
    try {
        const response = API.post(tagRoutes.addTag, {tag})
        return response
    } catch (error) {
        return error
    }
}