import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem('role');

  if (allowedRoles.includes('userRole')) {
    return <Route element={element} />;
  }

  // Redirect to a different route or show an error message
  return <Navigate to="/" replace />;
}

export default ProtectedRoute;
