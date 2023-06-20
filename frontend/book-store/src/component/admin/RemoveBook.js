import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { BASE_URL } from '../../config/apiConfig';

const RemoveBook = () => {
  const { isAuthenticated, credentials, userRole } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [bookId, setBookId] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/books`, {
        headers: {
          Authorization: isAuthenticated && credentials ? `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` : '',
        },
      });
  
      if (response.status === 200) {
        setBooks(response.data);
      } else {
        console.log('Failed to fetch books.');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleDelete = async (bookId) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/books/${bookId}`, {
        headers: {
          Authorization: isAuthenticated && credentials ? `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` : '',
        },
      });

      if (response.status === 200) {
        console.log('Book removed successfully.');
        fetchBooks();
      } else {
        console.log('Failed to remove book.');
      }
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
    <div className="mt-8 container m-auto content-center">
      <h2 className="text-2xl font-bold mb-4 text-[#9dce67]">Smazat knihy</h2>
      <div className="grid grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book.idBook} className="border border-gray-300 rounded-md p-4">
            <h3 className="font-bold text-lg mb-2">{book.name}</h3>
            <p>ISBN: {book.isbn}</p>
            <p>Autor: {book.author.name} {book.author.surname}</p>
            <button
              type="button"
              className="bg-red-500 text-white py-2 px-4 rounded-md mt-4 hover:bg-red-700"
              onClick={() => handleDelete(book.idBook)}
            >
              Smazat
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RemoveBook;
