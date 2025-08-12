import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import notificationReducer from './slices/notificationSlice';
import registerReducer from './slices/registerSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        notification: notificationReducer,
        register: registerReducer
    }
})

export default store;