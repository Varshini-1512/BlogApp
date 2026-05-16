import React from 'react'
import { useAuth } from '../store/authStore.js'
import { useNavigate, Navigate } from 'react-router';

function ProtectedRoute({ children, allowedRoles }) {
    //get user login status from store
    const { loading, currentUser, isAuthenticated } = useAuth();

    //loading state
    if (loading) {
        return <p>Loading...</p>
    }
    //if user not logged in
    if (!isAuthenticated) {
        //redirect to login
        return <Navigate to="/unauthorized" replace />
    }
    // check roles
    if (allowedRoles && !allowedRoles.includes(currentUser?.role)) {
        // logout

        // redirect to login
        return <Navigate to='/unauthorized' redirectTo='/' />
    }
    return children;

}

export default ProtectedRoute
