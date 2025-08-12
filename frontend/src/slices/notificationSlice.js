import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isVisible: false,
    type: 'info',
    message: '',
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        showNotification: (state, action) => {
            const { type, message } = action.payload;
            state.isVisible = true;
            state.type = type;
            state.message = message;
        },
        hideNotification: (state) => {
            state.isVisible = false;
            state.message = '';
        },
    },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;