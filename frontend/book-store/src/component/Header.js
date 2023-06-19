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
            <a href="/" className=" hover:text-blue-700">
              Domů
            </a>
            </div>
          
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
          <li>
            <Link to="/basket">Basket</Link>
          </li>
        </nav>
      </div>
    </header>
  );
};

export default Header;
