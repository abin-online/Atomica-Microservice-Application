import { useSelector } from "react-redux";
import { currentUser } from "@/@types/currentUser";

const useGetUser = () => {
    const user = useSelector((state: currentUser) => state.user.role == 'user')
    console.log(user)
    return user
}
export const useGetUserData = () => {
    return useSelector((state: currentUser) => state)
}
export default useGetUser