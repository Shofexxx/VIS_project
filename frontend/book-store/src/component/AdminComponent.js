import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';

const AdminComponent = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <div>Musíte se přihlásit jako admin.</div>;
  }

  if (userRole !== 'admin') {
    return <div>Přístup k této stránce je pouze pro adminy.</div>;
  }

  return (
    <div>
      <div className='container m-auto'>
      <div className="flex justify-center mb-2 mt-10">
        <img src={logo} alt="Logo" className="mb-2 h-64" />
      </div>
      <h2 className='text-center text-lg font-bold mb-2 uppercase text-[#9dce67] '>Administrace</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/admin/add-book">
          <div className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100">
            <h3>Přidat knihu</h3>
          </div>
        </Link>
        <Link to="/admin/customers">
          <div className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100">
            <h3>Zákazníci</h3>
          </div>
        </Link>
        <Link to="/admin/orders">
          <div className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100">
            <h3>Objednávky</h3>
          </div>
        </Link>
        <Link to="/admin/remove-book">
          <div className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100">
            <h3>Odstranit knížky</h3>
          </div>
        </Link>
      </div>
      </div>
    </div>
  );
};

export default AdminComponent;
