import React, { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';

const AdminComponent = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext);

  if (!isAuthenticated) {
    return <div>You need to log in as an admin to access this page.</div>;
  }

  if (userRole !== 'admin') {
    return <div>Access to this page is restricted to admin users only.</div>;
  }

  return (
    <div>
      <div className='container m-auto'>
      <h2>Admin Dashboard</h2>
      <div className="grid grid-cols-2 gap-4">
        <Link to="/admin/add-book">
          <div className="p-4 border rounded shadow cursor-pointer hover:bg-gray-100">
            <h3>Add Book</h3>
            <p>Click here to add a new book</p>
          </div>
        </Link>
        <div className="p-4 border rounded shadow">
          <h3>Other Functionality</h3>
          <p>Other admin functionality goes here</p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default AdminComponent;
