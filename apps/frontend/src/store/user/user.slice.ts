import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {IUser} from "../../types/types.ts";

// Define a type for the slice state
interface UserState {
    user: IUser | null;
    isAuthenticated: boolean;
}

// Define the initial state using that type
const initialState: UserState = {
    user: null,
    isAuthenticated: false
}

export const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user
            state.isAuthenticated = true
        },
        logout: () => initialState,
    },
})

export const { login, logout } = counterSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.user

export default counterSlice.reducer