import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';

const Header = () => {
  const { isAuthenticated, logout, userRole } = useContext(AuthContext);

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-2">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold">Procházet</div>
          <div>
            {isAuthenticated && (
              <>
                {userRole === 'admin' && (
                  <a href="/admin" className="text-blue-500 hover:text-blue-700">
                    Administration
                  </a>
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
              <a href="/login" className="text-blue-500 hover:text-blue-700">
                Login
              </a>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
