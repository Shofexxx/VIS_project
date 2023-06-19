import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { BASE_URL } from '../../config/apiConfig';

const CustomerComponent = () => {
  const { isAuthenticated, credentials } = useContext(AuthContext);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/customers`, {
          headers: {
            Authorization: isAuthenticated && credentials ? `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` : '',
          },
        });
        setCustomers(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchCustomers();
  }, [isAuthenticated, credentials]);

  const handleCustomerClick = async (customerId) => {
    try {
      const customerResponse = await axios.get(`${BASE_URL}/api/customers/${customerId}`, {
        headers: {
          Authorization: isAuthenticated && credentials ? `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` : '',
        },
      });
      setSelectedCustomer(customerResponse.data);
      setShowPopup(true);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const deleteCustomer = async (customerId) => {
    const confirmed = window.confirm('Opravdu chcete smazat toho uživatele? Smažou se i jeho objednávky.');
    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${BASE_URL}/api/customers/${customerId}`, {
        headers: {
          Authorization: isAuthenticated && credentials ? `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` : '',
        },
      });
      setCustomers(customers.filter((customer) => customer.idCustomer !== customerId));
      setSelectedCustomer(null);
      setShowPopup(false);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!isAuthenticated) {
    return <div>You need to log in as an admin to access this page.</div>;
  }

  return (
    <div className='container mx-auto grid gap-4 grid-cols-3 mt-10'>
      {customers.map((customer) => (
        <div key={customer.idCustomer} className="border rounded shadow p-4">
          <h3 className="text-lg font-bold mb-2">
            {customer.name} {customer.surname}
          </h3>
          <p>Email: {customer.email}</p>
          <button
            onClick={() => handleCustomerClick(customer.idCustomer)}
            className="text-blue-500 underline"
          >
            View Orders
          </button>
          <button
            onClick={() => deleteCustomer(customer.idCustomer)}
            className="ml-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      ))}

      {showPopup && selectedCustomer && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-gray-500 opacity-50"></div>
          <div className="bg-white rounded-lg p-8 shadow-lg relative">
            <h2 className="text-xl font-bold mb-4">Selected Customer Orders</h2>
            <p>
              Name: {selectedCustomer.name} {selectedCustomer.surname}
            </p>
            <p>Email: {selectedCustomer.email}</p>

            <h3 className="text-lg font-bold mt-4">Orders:</h3>
            <ul>
              {selectedCustomer.assignedBooks.map((order) => (
                <li key={order.idOrder}>{order.name}</li>
              ))}
            </ul>

            <button
              onClick={closePopup}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerComponent;
