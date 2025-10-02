import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// REGISTER thunk
export const registerUser = createAsyncThunk(
    'register/registerUser',
    async (formData, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/auth/register`, formData);
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Something went wrong';
            return rejectWithValue(errorMsg);
        }
    }
);

// VERIFY EMAIL thunk
export const verifyEmail = createAsyncThunk(
    'register/verifyEmail',
    async (token, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URI}/auth/verifyEmail`, { token });
            return response.data;
        } catch (err) {
            const errorMsg = err.response?.data?.message || err.message || 'Verification failed';
            return rejectWithValue(errorMsg);
        }
    }
);

const registerSlice = createSlice({
    name: 'register',
    initialState: {
        status: 'idle',
        message: null,
        error: null,
        verifyStatus: 'idle',
        verifyError: null,
        verifySuccess: null,
    },
    reducers: {
        clearRegisterState: (state) => {
            state.status = 'idle';
            state.message = null;
            state.error = null;
        },
        clearVerifyState: (state) => {
            state.verifyStatus = 'idle';
            state.verifyError = null;
            state.verifySuccess = null;
        }
    },
    extraReducers: (builder) => {
        builder
            // REGISTER
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.message = null;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.message = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })

            // VERIFY EMAIL
            .addCase(verifyEmail.pending, (state) => {
                state.verifyStatus = 'loading';
                state.verifyError = null;
                state.verifySuccess = null;
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                state.verifyStatus = 'succeeded';
                state.verifySuccess = action.payload.message;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.verifyStatus = 'failed';
                state.verifyError = action.payload;
            });
    }
});

export const { clearRegisterState, clearVerifyState } = registerSlice.actions;
export default registerSlice.reducer;
