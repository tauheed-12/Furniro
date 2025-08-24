// src/redux/paymentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    billingDetails: {
        firstName: "",
        lastName: "",
        companyName: "",
        country: "",
        streetAddress: "",
        city: "",
        province: "",
        zipCode: "",
        emailAddress: "",
        additionalInfo: ""
    },
    payMethod: "",
};

const paymentSlice = createSlice({
    name: "payment",
    initialState,
    reducers: {
        setBillingDetails: (state, action) => {
            state.billingDetails = { ...state.billingDetails, ...action.payload };
        },
        resetBillingDetails: (state) => {
            state.billingDetails = initialState.billingDetails;
        },
        setPaymentMethod: (state, action) => {
            state.payMethod = action.payload;
        },
        resetPaymentMethod: (state) => {
            state.payMethod = "";
        },
        clearPayment: (state) => {
            state.billingDetails = initialState.billingDetails;
            state.payMethod = "";
        },
    },
});

export const {
    setBillingDetails,
    resetBillingDetails,
    setPaymentMethod,
    resetPaymentMethod,
    clearPayment,
} = paymentSlice.actions;

export default paymentSlice.reducer;
