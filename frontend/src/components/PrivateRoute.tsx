import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface PrivateRouteProps {
    children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    return user ? <>{children}</> : <Navigate to="/login" />;
}; 