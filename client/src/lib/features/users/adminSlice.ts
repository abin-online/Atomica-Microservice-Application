import { createSlice } from "@reduxjs/toolkit";
import { admin } from "@/@types/admin";

const initialState: admin = {
    id: '',
    name: '',
    email: '',
    role: ''
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setAdmin: (state, action) => {
            const { id, name, email, role } = action.payload
            state.id = id
            state.name = name
            state.role = role
            state.email = email
            if (typeof window !== 'undefined') {
                localStorage.setItem('admin', JSON.stringify(state));
            }
        },

        removeAdmin: (state) => {
            state.id = ''
            state.name = ''
            state.role = ''
            state.email = ''
            if (typeof window !== 'undefined') {
                localStorage.removeItem('mentor');
            }
        },


    }
})

export const {
    setAdmin,
    removeAdmin
} = adminSlice.actions;

export default adminSlice.reducer