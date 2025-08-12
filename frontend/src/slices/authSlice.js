import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Cookie Helpers
const setCookie = (name, value, minutes = 40) => {
    const date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax; Secure`;
};

const getCookie = (name) => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? match[2] : null;
};

const clearCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// Async Thunk with proper error handling
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8080/auth/login', credentials);
            return response.data;
        } catch (err) {
            const message = err.response?.data?.message || err.message || 'Something went wrong';
            return rejectWithValue(message);
        }
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = {};
            clearCookie('userId');
            clearCookie('isAdmin');
            clearCookie('token');
        },
        setUserFromCookies: (state) => {
            const userId = getCookie('userId');
            const isAdmin = getCookie('isAdmin');
            const token = getCookie('token');

            if (userId && token) {
                state.user = {
                    userId,
                    isAdmin: isAdmin === 'true',
                    token,
                };
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { userId, isAdmin, token } = action.payload;
                setCookie('userId', userId);
                setCookie('isAdmin', isAdmin);
                setCookie('token', token);
                state.user = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    },
});

export const { logout, setUserFromCookies } = authSlice.actions;
export default authSlice.reducer;
