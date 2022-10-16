import { createSlice } from '@reduxjs/toolkit'
import { removeAuthToken } from 'utility/token.utils';

const initialStateValue = {}

export const userSlice = createSlice({
    name: 'user',
    initialState: { value: initialStateValue },
    reducers: {
        login: (state, action) => {
            state.value = action.payload

        },
        logout: (state) => {
            state.value = initialStateValue;
            localStorage.clear();
            removeAuthToken()
            // eslint-disable-next-line no-restricted-globals
            location.href="/login";

        }
    }
})
export const { login, logout } = userSlice.actions

export default userSlice.reducer;

