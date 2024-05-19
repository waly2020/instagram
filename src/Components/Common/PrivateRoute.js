import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Make sure the path is correct

const PrivateRoute = ({ children }) => {
  const { currentUser, isLoading } = useAuth();

  // If the authentication state is still loading, you can return a loading indicator or null to wait
  if (isLoading) {
    return <div>Loading...</div>; // Or some other loading indicator
  }

  // Redirect to login if not authenticated
  return currentUser ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
