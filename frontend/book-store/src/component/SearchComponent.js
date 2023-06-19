import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/apiConfig";
import { Link } from 'react-router-dom';

const SearchComponent = () => {
  const [keyword, setKeyword] = useState("");
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timer;

    const handleDelayedSearch = () => {
      clearTimeout(timer);


      timer = setTimeout(() => {
        if (keyword.length >= 3) {
          fetchBooks();
        } else {
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
          placeholder="Vyhledat knihy"
          className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      {error && <p>{error}</p>}
      {books.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {books.map((book) => (
            <Link to={`/books/${book.idBook}`} key={book.idBook} className="text-blue-500 hover:scale-105 transition-all">
              <div className="bg-white rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2 uppercase">{book.name}</h3>
                <div className="flex justify-start">
                  <span className="font-bold pr-2 mb-2">Autor:</span>
                  <span>{book.author.name} {book.author.surname}</span>
                </div>
                <div className="flex justify-start">
                  <span className="font-bold pr-2 mb-2">Počet: </span>
                  <span>{book.quantity}</span>
                </div>
                <div className="flex justify-start mb-2">
                  <span className="font-bold pr-2">Cena: </span>
                  <span>{book.price} Kč</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};


export default SearchComponent;
