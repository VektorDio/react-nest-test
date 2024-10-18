import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
   isAuthenticated,
   isAdmin,
   element,
}) => {
    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />;
    }

    if (isAdmin && window.location.pathname === '/survey') {
        return <Navigate to="/results" replace />;
    }

    if (!isAdmin && window.location.pathname === '/results') {
        return <Navigate to="/survey" replace />;
    }

    return element;
};

export default ProtectedRoute;