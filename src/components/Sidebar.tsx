import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 p-6">
      <ul className="space-y-4">
        <li>
          <Link to="/store" className="hover:text-gray-400">
            Store
          </Link>
        </li>
        <li>
          <Link to="/sku" className="hover:text-gray-400">
            SKU
          </Link>
        </li>
        <li>
          <Link to="/planning" className="hover:text-gray-400">
            Planning
          </Link>
        </li>
        <li>
          <Link to="/charts" className="hover:text-gray-400">
            Charts
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
