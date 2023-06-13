import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/apiConfig";
import { Link } from 'react-router-dom';

const SearchComponent = () => {
    const [keyword, setKeyword] = useState("");
    const [books, setBooks] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Define a timer variable
      let timer;
  
      // Function to handle the delayed search
      const handleDelayedSearch = () => {
        // Clear the previous timer
        clearTimeout(timer);
  
    
        timer = setTimeout(() => {
          if (keyword.length >= 3) {
            fetchBooks();
          } else {
            // If the keyword is less than 3 characters, clear the books and error states
            setBooks([]);
            setError(null);
          }
        }, 100);
      };
  
      handleDelayedSearch();
  

      return () => {
        clearTimeout(timer);
      };
    }, [keyword]);
  
    const fetchBooks = () => {
      axios
        .get(`${BASE_URL}/api/books/search/${keyword}`)
        .then((response) => {
          const data = response.data;
          if (data.length === 0) {
            setError("Žádná kniha s tímto názvem nenalezena.");
          } else {
            setBooks(data);
            setError(null);
          }
        })
        .catch((error) => {
          setError("Žádná kniha s tímto nenalezena.");
        });
    };
  
    return (
        <div>
          <div className="max-w-md mx-auto mb-4">
            <input
              type="text"
              placeholder="Search for books"
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          {error && <p>{error}</p>}
          {books.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              {books.map((book) => (
                // Wrap each book card in a Link component with the book's ID as a parameter
                <Link to={`/books/${book.idBook}`} key={book.idBook} className="text-blue-500 hover:underline">
                  <div className="bg-white p-4 shadow rounded-md">
                    <h3 className="text-xl font-semibold">{book.name}</h3>
                    <p className="text-gray-500">ISBN: {book.isbn}</p>
                    <p className="text-gray-500">Quantity: {book.quantity}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    };
    

export default SearchComponent;
