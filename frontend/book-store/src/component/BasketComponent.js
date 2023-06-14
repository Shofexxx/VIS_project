import React, { useEffect, useState } from 'react';
import BasketService from '../service/BasketService';

const BasketComponent = () => {
  const [basketItems, setBasketItems] = useState([]);

  useEffect(() => {
    fetchBasketItems();
  }, []);

  const fetchBasketItems = async () => {
    try {
      const response = await BasketService.getBasket();
      setBasketItems(response.data);
    } catch (error) {
      console.error('Error fetching basket items:', error);
    }
  };

  const removeFromBasket = async (bookId) => {
    try {
      await BasketService.removeFromBasket(bookId);
      setBasketItems((prevItems) => {
        const updatedItems = [...prevItems];
        const index = updatedItems.findIndex((item) => item.idBook === bookId);
        if (index !== -1) {
          updatedItems.splice(index, 1);
        }
        return updatedItems;
      });
    } catch (error) {
      console.error('Error removing book from basket:', error);
    }
  };

  const clearBasket = async () => {
    try {
      await BasketService.clearBasket();
      fetchBasketItems();
    } catch (error) {
      console.error('Error clearing basket:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md bg-white p-8 shadow rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Your Basket</h2>
        {basketItems.length === 0 ? (
          <p>Your basket is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {basketItems.map((item) => (
              <div key={item.idBook} className="bg-white rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p>Author: {item.author.name + ' ' + item.author.surname}</p>
                <p>ISBN: {item.isbn}</p>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-md mt-2"
                  onClick={() => removeFromBasket(item.idBook)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
          onClick={() => clearBasket()}
        >
          Clear Basket
        </button>
      </div>
    </div>
  );
};

export default BasketComponent;
