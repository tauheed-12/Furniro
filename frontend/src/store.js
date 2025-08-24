import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import notificationReducer from './slices/notificationSlice';
import registerReducer from './slices/registerSlice';
import paymentReducer from './slices/paymentSlice';
import checkoutReducer from './slices/checkoutSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        notification: notificationReducer,
        register: registerReducer,
        payment: paymentReducer,
        checkout: checkoutReducer,
    }
})

export default store;