import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { BASE_URL } from '../../config/apiConfig';

const OrdersComponent = () => {
  const { isAuthenticated, credentials, userRole } = useContext(AuthContext);
  const [assignedBooks, setAssignedBooks] = useState([]);

  useEffect(() => {
    const fetchAssignedBooks = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/orders`, {
          headers: {
            Authorization: isAuthenticated && credentials ? `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` : '',
          },
        });
        setAssignedBooks(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchAssignedBooks();
  }, [isAuthenticated, credentials]);

  const handleDelete = async (customerId) => {
    const confirmed = window.confirm('Opravdu chcete smazat tuto objednávku?');
    if (!confirmed) {
      return;
    }
  
    try {
      await axios.delete(`${BASE_URL}/api/customers/${customerId}`, {
        headers: {
          Authorization: isAuthenticated && credentials ? `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` : '',
        },
      });
      setAssignedBooks(assignedBooks.filter((book) => book.customerId !== customerId));
    } catch (error) {
      console.log('Error:', error);
    }
  };
  
  if (!isAuthenticated) {
    return <div>Pro přístup na tuto stránku se musíte přihlásit jako správce.</div>;
  }

  if (userRole !== 'admin') {
    return <div>Přístup na tuto stránku je omezen pouze na administrátory.</div>;
  }
  return (
    <div className='container mx-auto grid gap-4 grid-cols-3 mt-10'>
      {assignedBooks.map((book) => (
        <div key={book.bookId} className='border rounded shadow p-4'>
          <h3 className='text-lg font-bold mb-2'>{book.bookName}</h3>
          <p>
            Zákazník: {book.customerName} {book.customerSurname} ({book.customerEmail})
          </p>

          <button onClick={() => handleDelete(book.customerId)} className='text-red-500 underline'>
            Smazat
          </button>
        </div>
      ))}
    </div>
  );
};

export default OrdersComponent;
