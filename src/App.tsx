import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes/MainRoute';
import AuthRoutes from './routes/AuthRoute';
import useAuthStore from './store/authStore';
import Topbar from './components/Topbar';
import Sidebar from './components/Sidebar';


const App: React.FC = () => {
const { authenticated } = useAuthStore();
  return (
    <Router>
     <div className="flex flex-col h-screen">
        {/* Topbar Component */}
        <Topbar />

        <div className="flex flex-1">
          {/* Sidebar Component */}
          {authenticated && <Sidebar />}

          {/* Main Content Area */}
          <main className="flex-1 bg-gray-100 p-6">
            {authenticated ? <MainRoutes /> : <AuthRoutes />}
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;