import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoutes = () => {
    const { user } = useSelector(state => state.auth);

    return user.userId ? <Outlet /> : <Navigate to='/signIn' />;
};

export default ProtectedRoutes;
