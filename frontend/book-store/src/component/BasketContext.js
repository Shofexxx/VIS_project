import React, { createContext, useEffect, useState } from 'react';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  useEffect(() => {
    // Retrieve basket data from browser storage on component mount
    const storedBasket = localStorage.getItem('basket');
    if (storedBasket) {
      setBasket(JSON.parse(storedBasket));
    }
  }, []);

  useEffect(() => {
    // Update browser storage when basket changes
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  const addToBasket = (item) => {
    setBasket((prevBasket) => [...prevBasket, item]);
  };

  const removeFromBasket = (item) => {
    setBasket((prevBasket) =>
      prevBasket.filter((basketItem) => basketItem.id !== item.id)
    );
  };

  const clearBasket = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider
      value={{
        basket,
        addToBasket,
        removeFromBasket,
        clearBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};
