import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoutes = () => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to='/signin' />;
}

export default ProtectedRoutes;