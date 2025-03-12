import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Auth from '../screens/Auth';

const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Auth />} /> 
    </Routes>
  );
};

export default AuthRoutes;