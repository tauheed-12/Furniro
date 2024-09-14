import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoutes = () => {
    const { userId, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    console.log('ProtectedRoutes userId:', userId);

    return userId ? <Outlet /> : <Navigate to='/signIn' />;
};

export default ProtectedRoutes;
