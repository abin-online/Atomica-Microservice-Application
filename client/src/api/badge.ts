import API from "@/service/axios";
import badgeRoutes from "./endPoints/badges";

export const fetchBadge = async ()=> {
    try {
        const response = await API.get(badgeRoutes?.getBadges)
        return response
    } catch (error) {
        return error
    }
}

export const blockBadge = async(id : string, isActive : boolean)=> {
    try {
        const response = await API.put(badgeRoutes.blockBadge , {id, isActive} )
        return response
    } catch (error) {
        return error
    }
}

export const getBadge = async(id : string )=> {
    try {
        console.log("_______________", badgeRoutes.getBadge+id)
        const response = await API.get(badgeRoutes.getBadge + id);
        return response
    } catch (error) {
        return error
    }
}

export const updateBadge = async(id : string , uploadData : any, headers : any)=> {
    try {
        const response = await API.put(badgeRoutes.updateBadge + id , uploadData, headers);
        return response
    } catch (error) {
        return error
    }
}

export const createBadge = async (uploadData : any, header : any)=> {
    try {
        const response = await API.post(badgeRoutes.createBadge , uploadData , header)
        return response
    } catch (error) {
        return error
    }
}

export const updateTest = async (userQuizData : any) => {
    try {
        const response = API.post(badgeRoutes.testResult, userQuizData)
        return response
    } catch (error) {
        return error
    }
}
