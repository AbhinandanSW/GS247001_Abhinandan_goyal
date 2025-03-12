import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainRoutes from './routes/MainRoute';
import AuthRoutes from './routes/AuthRoute';
import useAuthStore from './store/authStore';


const App: React.FC = () => {
const { authenticated } = useAuthStore();
  return (
    <Router>
      <div style={{ display: 'flex' , alignItems: 'center', justifyContent: 'center', height: '100vh'}}>
          {authenticated ? <MainRoutes /> : <AuthRoutes />}
      </div>
    </Router>
  );
};

export default App;