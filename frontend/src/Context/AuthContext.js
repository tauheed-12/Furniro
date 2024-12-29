import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cookieUserId = Cookies.get('userId');
        const cookieIsAdmin = Cookies.get('isAdmin') === 'true';

        console.log('Initializing AuthProvider...');
        console.log('Cookie User ID:', cookieUserId);
        console.log('Cookie Admin Status:', cookieIsAdmin);

        if (cookieUserId) {
            setUserId(cookieUserId);
        }

        if (cookieIsAdmin) {
            setIsAdmin(cookieIsAdmin);
        }

        setLoading(false);
    }, []);

    const updateUserId = (id) => {
        setUserId(id);
        Cookies.set('userId', id);
        console.log('Updated User ID:', id);
    };

    const updateIsAdmin = (adminStatus) => {
        setIsAdmin(adminStatus);
        Cookies.set('isAdmin', adminStatus);
        console.log('Updated Admin Status:', adminStatus);
    };

    return (
        <AuthContext.Provider value={{ userId, setUserId: updateUserId, isAdmin, setIsAdmin: updateIsAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
