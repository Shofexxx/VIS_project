import React, { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent';
import { BASE_URL } from '../config/apiConfig';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [topBooks, setTopBooks] = useState([]);

  useEffect(() => {
    fetchTopBooks();
  }, []);

  const fetchTopBooks = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/books/top3`);
      if (response.status === 200) {
        const data = response.data;
        setTopBooks(data);
      } else {
        console.error('Failed to fetch top books.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <div className="container mx-auto py-8">
        <SearchComponent />

        <h2 className="text-2xl font-bold mb-4">Top 3 knížky</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {topBooks.map((book) => (
            <Link
              to={`/books/${book.idBook}`}
              key={book.idBook}
              className="text-blue-500 hover:scale-105 transition-all"
            >
              <div className="bg-white rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2">{book.name}</h3>
                <div className="flex justify-start mb-2">
                  <span className="font-bold pr-2">Cena: </span>
                  <span>{book.price}</span>
                </div>
                <div className="flex justify-start mb-2">
                  <span className="font-bold pr-2">Počet: </span>
                  <span>{book.quantity}</span>
                </div>
                <div className="flex justify-start">
                  <span className="font-bold pr-2">Autor:</span>
                  <span>{book.author.name} {book.author.surname}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;