import badgeRoutes from "./endPoints/badges";
import ADMINAPI from "@/service/adminAxios";
import USERAPI from "@/service/axios";

export const fetchBadge = async () => {
    try {
        const response = await ADMINAPI.get(badgeRoutes?.getBadges)
        return response
    } catch (error) {
        return error
    }
}

export const blockBadge = async (id: string, isActive: boolean) => {
    try {
        const response = await ADMINAPI.put(badgeRoutes.blockBadge, { id, isActive })
        return response
    } catch (error) {
        return error
    }
}

export const getBadge = async (id: string) => {
    try {
        console.log("_______________", badgeRoutes.getBadge + id)
        const response = await ADMINAPI.get(badgeRoutes.getBadge + id);
        return response
    } catch (error) {
        return error
    }
}

export const updateBadge = async (id: string, uploadData: any, headers: any) => {
    try {
        const response = await ADMINAPI.put(badgeRoutes.updateBadge + id, uploadData, headers);
        return response
    } catch (error) {
        return error
    }
}

export const createBadge = async (uploadData: any, header: any) => {
    try {
        console.log("create Badgee =====", uploadData)
        const response = await ADMINAPI.post(badgeRoutes.createBadge, uploadData, header)
        return response
    } catch (error) {
        return error
    }
}

//score updation after the user completes an mcq test
export const updateTest = async (userQuizData: any) => {
    try {
        const response = USERAPI.post(badgeRoutes.testResult, userQuizData)
        return response
    } catch (error) {
        return error
    }
}

export const updateProblemScore = async (email: string, problem: string, submitted: boolean) => {
    try {
        console.log(email, problem, submitted)
        const response = USERAPI.post(badgeRoutes.problemResult, { email, problem, submitted })
        return response
    } catch (error) {
        return error
    }
}

export const getProfile = async () => {
    try {
        const response = await USERAPI.get(badgeRoutes.profile);
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}

export const updateProfile = async (formData: any, headers: any) => {
    try {
        const response = await USERAPI.put(badgeRoutes.updateProfile, formData, headers);
        console.log(response)
        return response
    } catch (error) {
        return error
    }
}

export const getProfilePicture = async () => {
    try {
        const response = await USERAPI.get(badgeRoutes.profilePicture);
        return response;
    } catch (error) {
        return error
    }
}


export const getStreak = async ({ year, month }: { year?: number; month?: number }) => {
    try {
        // Construct the query parameters based on the provided year and month
        const params = new URLSearchParams();
        if (year !== undefined) params.append('year', year.toString());
        if (month !== undefined) params.append('month', month.toString());

        // Make the API call with the constructed query parameters
        const response = await USERAPI.get(`${badgeRoutes.problemStreak}?${params.toString()}`);
        return response;
    } catch (error) {
        console.error('Error in getStreak API:', error);
        return error;
    }
};



export const leaderBoardFromBadgeService = async () => {
    try {
        const response = await ADMINAPI.get(badgeRoutes.LeaderBoard);
        return response
    } catch (error) {
        return error
    }
}

export const submissionFiltering = async (filters: any) => {
    try {
        const response = await ADMINAPI.get(`${badgeRoutes.submissionFiltering}?${filters}`);
        return response
    } catch (error) {
        return error
    }
}
