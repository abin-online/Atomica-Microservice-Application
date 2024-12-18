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
        },

        removeAdmin: (state) => {
            state.id = ''
            state.name = ''
            state.role = ''
            state.email = ''
        },


    }
})

export const {
    setAdmin,
    removeAdmin
} = adminSlice.actions;

export default adminSlice.reducer