import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [checkOutAmount, setCheckOutAmount] = useState(0)
    const token = localStorage.getItem('token');
    const login = (data) => {
        setUserData(data);
        setIsAuthenticated(true)
    };
    const logout = () => {
        setUserData(null);
        setIsAuthenticated(false)
    };

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            userData,
            checkOutAmount,
            setCheckOutAmount, setIsAuthenticated, login, logout,
            setUserData
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);