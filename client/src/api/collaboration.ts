import USERAPI from "@/service/axios";
import collaboration from "./endPoints/collaboration";

export const createCollaboration = async ( )=> {
    try {
        const response = await USERAPI.post(collaboration.createSession );
        return response
    } catch (error) {
        return error
    }
}

export const endCollaboration =  async (roomId: string)=> {
    try {
        const response = await USERAPI.put(collaboration.endSession, {roomId});
        return response
    } catch (error) {
        return error
    }
}

export const joinCollaboration = async (roomId : string)=> {
    try {
        const response = await USERAPI.put(collaboration.joinSession + roomId);
        console.log('response', response)
        return response
    } catch (error) {
        return error
    }
}