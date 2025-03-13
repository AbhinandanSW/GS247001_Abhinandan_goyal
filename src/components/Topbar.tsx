import React, { useState } from 'react';
import { FiUser } from 'react-icons/fi'; // Importing a user icon from react-icons
import useAuthStore  from '../store/authStore'; // Assuming the useAuthStore is located here

const Topbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className=" p-4 shadow-md">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src="/logo.svg" alt="GsynergyLogo" className="w-10 h-10" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">Data Viewer</span>
        </div>
        {/* User Icon and Menu */}
        {authenticated && <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <FiUser className="text-xl" />
          </button>

          {/* Logout Menu */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg">
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 text-left hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>}
      </div>
    </div>
  );
};

export default Topbar;
