import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '../config/apiConfig';
import { useParams } from 'react-router-dom';
import BasketService from '../service/BasketService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import logo from '../img/logo.png';

const BookDetailsComponent = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = () => {
    axios
      .get(`${BASE_URL}/api/books/${bookId}`)
      .then((response) => {
        const data = response.data;
        setBook(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handlePurchase = () => {
    if (book && book.quantity > 0) {
      console.log('Purchase button clicked');
      BasketService.addToBasket(book)
        .then((response) => {
          console.log('Item added to basket:', book);
          toast.success('Úspěšně přidáno do košíku.');
        })
        .catch((error) => {
          console.error('Error:', error);
          toast.error('Někde se stala chyba.');
        });
    }else{
      toast.error('Kniha není skladem.');
    }
  };

  return (
    <div>
      <ToastContainer position="bottom-right"/>
      <div className="flex justify-center mb-2 mt-10">
          <img src={logo} alt="Logo" className="mb-2 h-64" />
        </div>
    <div className="flex justify-center mt-10">
    
      {book ? (
        <div className="bg-white rounded shadow p-10 m-10">
        
          
                <h3 className="text-lg font-bold mb-2 uppercase">{book.name}</h3>
                <div className="flex justify-start">
                  <span className="font-bold pr-2 mb-2">Autor:</span>
                  <span>{book.author.name} {book.author.surname}</span>
                </div>
                <div className="flex justify-start">
                  <span className="font-bold pr-2 mb-2">ISBN:</span>
                  <span>{book.isbn}</span>
                </div>
                <div className="flex justify-start">
                  <span className="font-bold pr-2 mb-2">Počet: </span>
                  <span>{book.quantity}</span>
                </div>
                <div className="flex justify-start mb-2">
                  <span className="font-bold pr-2">Cena: </span>
                  <span>{book.price} Kč</span>
                </div>
              
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={handlePurchase}
          >
            Purchase
          </button>
        </div>
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
    </div>
  );
};

export default BookDetailsComponent;
