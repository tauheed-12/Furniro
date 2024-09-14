import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        // Initialize state from cookies
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

        setLoading(false); // Set loading to false after initialization
    }, []);

    const updateUserId = (id) => {
        setUserId(id);
        Cookies.set('userId', id); // Store userId in cookies
        console.log('Updated User ID:', id);
    };

    const updateIsAdmin = (adminStatus) => {
        setIsAdmin(adminStatus);
        Cookies.set('isAdmin', adminStatus); // Store isAdmin in cookies
        console.log('Updated Admin Status:', adminStatus);
    };

    return (
        <AuthContext.Provider value={{ userId, setUserId: updateUserId, isAdmin, setIsAdmin: updateIsAdmin, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
