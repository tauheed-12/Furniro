import React, { createContext, useContext, useState } from "react";

const CheckoutContext = createContext();

export const CheckoutProvider = ({ children }) => {
    const [totalCheckoutValue, setTotalCheckoutValue] = useState(0);
    const [productIds, setProductIds] = useState([]);
    return <CheckoutContext.Provider value={{
        totalCheckoutValue,
        productIds,
        setProductIds,
        setTotalCheckoutValue
    }}>
        {children}
    </CheckoutContext.Provider>
}

export const useCheckout = () => useContext(CheckoutContext)