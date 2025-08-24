// src/redux/checkoutSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalCheckoutValue: 0,
    productIds: [],
};

const checkoutSlice = createSlice({
    name: "checkout",
    initialState,
    reducers: {
        setTotalCheckoutValue: (state, action) => {
            state.totalCheckoutValue = action.payload;
        },
        setProductIds: (state, action) => {
            state.productIds = action.payload;
        },
        addProductId: (state, action) => {
            state.productIds.push(action.payload);
        },
        removeProductId: (state, action) => {
            state.productIds = state.productIds.filter(id => id !== action.payload);
        },
        clearCheckout: (state) => {
            state.totalCheckoutValue = 0;
            state.productIds = [];
        },
    },
});

export const {
    setTotalCheckoutValue,
    setProductIds,
    addProductId,
    removeProductId,
    clearCheckout,
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
