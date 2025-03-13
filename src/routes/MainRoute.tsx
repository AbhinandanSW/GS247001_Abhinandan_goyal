import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute'
import Store from '@/screens/Store';
import Sku from '@/screens/Sku';
import Planning from '@/screens/Planning';

const MainRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Store />} />
        <Route path="/store" element={<Store />} />
        <Route path="/sku" element={<Sku />} />
        <Route path="/planning" element={<Planning/>} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;