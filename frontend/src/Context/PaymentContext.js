import React, { createContext, useContext, useState } from "react";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
    const [billingDetails, setBillingDetails] = useState({
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
    });

    const [payMethod, setPaymentMethod] = useState("");

    return (
        <PaymentContext.Provider value={{
            billingDetails,
            setBillingDetails,
            payMethod,
            setPaymentMethod
        }}>
            {children}
        </PaymentContext.Provider>
    );
};

export const usePayment = () => useContext(PaymentContext);
