import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config/apiConfig";
import { useParams } from "react-router-dom";

const BookDetailsComponent = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  
  useEffect(() => {
    fetchBook();
  });
  
  const fetchBook = () => {
    axios
      .get(`${BASE_URL}/api/books/${bookId}`)
      .then((response) => {
        const data = response.data;
        setBook(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };


  return (
    <div className="flex justify-center items-center h-screen">
      {book ? (
        <div className="max-w-md bg-white p-8 shadow rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{book.name}</h2>
          <p className="text-gray-500 mb-4">ISBN: {book.isbn}</p>
          <p className="text-gray-500 mb-4">Quantity: {book.quantity}</p>
          {/* Add additional book details */}
          <button className="bg-blue-500 text-white py-2 px-4 rounded-md">
            Purchase
          </button>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default BookDetailsComponent;
