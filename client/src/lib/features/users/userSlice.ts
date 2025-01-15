import { createSlice } from "@reduxjs/toolkit";
import { currentUser } from "@/@types/currentUser";

const initialState: currentUser = {
    id: '',
    name: '',
    email: '',
    role: '',
    user: undefined,
    blocked: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { id, name, email, role, blocked } = action.payload
            state.id = id
            state.name = name
            state.role = role
            state.email = email
            state.blocked = blocked
            if (typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(state));
            }
        },

        removeUser: (state) => {
            state.id = ''
            state.name = ''
            state.role = ''
            state.email = ''
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
            }
        },


    }
})

export const {
    setUser,
    removeUser
} = userSlice.actions;

export default userSlice.reducer