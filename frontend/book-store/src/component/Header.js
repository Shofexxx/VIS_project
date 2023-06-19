import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { isAuthenticated, logout, userRole } = useContext(AuthContext);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-2">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold">
            <Link to="/" className="hover:text-blue-700">
              Domů
            </Link>
          </div>
          
          <div>
            {isAuthenticated && (
              <>
                {userRole === 'admin' && (
                  <Link to="/admin" className="text-blue-500 hover:text-blue-700">
                    Administration
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="text-blue-500 hover:text-blue-700 ml-4"
                >
                  Logout
                </button>
              </>
            )}
            {!isAuthenticated && (
              <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Login
              </Link>
            )}
          </div>
          <li>
            <Link to="/basket">Basket</Link>
          </li>
        </nav>
      </div>
    </header>
  );
};

export default Header;