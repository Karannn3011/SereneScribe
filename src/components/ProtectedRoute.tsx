import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    // Get both the authentication status and the loading status
    const { isAuthenticated, isAuthLoading } = useAuth();

    // 1. While the authentication status is being checked, show a loading indicator
    if (isAuthLoading) {
        return (
            <div className="flex flex-col gap-2 items-center justify-center min-h-screen">
                <Loader2 className="w-4 h-4 animate-spin"/>
                <div>Loading...</div>
            </div>
        );
    }

    // 2. Once loading is complete, check if the user is authenticated
    if (!isAuthenticated) {
        // If not authenticated, redirect to the login page
        return <Navigate to="/" replace />;
    }

    // 3. If loading is complete and user is authenticated, render the page
    return <>{children}</>;
};

export default ProtectedRoute;