import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore  from '../store/authStore';

const ProtectedRoute: React.FC = () => {
  const { authenticated } = useAuthStore();

  if (!authenticated) {
    return <Navigate to="/" replace />; 
  }

  return <Outlet />; 
};

export default ProtectedRoute;