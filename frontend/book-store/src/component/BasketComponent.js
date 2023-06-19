import React, { useEffect, useState } from 'react';
import BasketService from '../service/BasketService';
import CustomerService from '../service/CustomerService';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

const BasketComponent = () => {
  const [basketItems, setBasketItems] = useState([]);
  const [customerData, setCustomerData] = useState({
    name: '',
    surname: '',
    email: '',
  });

  useEffect(() => {
    fetchBasketItems();
  }, []);

  const fetchBasketItems = async () => {
    try {
      const response = await BasketService.getBasket();
      setBasketItems(response.data);
    } catch (error) {
      console.error('Chyba při načítání položek košíku:', error);
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
      console.error('Chyba při odstraňování knihy z košíku:', error);
    }
  };

  const clearBasket = async () => {
    try {
      await BasketService.clearBasket();
      fetchBasketItems();
    } catch (error) {
      console.error('Chyba při vyprázdnění košíku:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addCustomer = async (customerData) => {
    try {
      const response = await api.post('/api/customers', customerData);
      return response.data;
    } catch (error) {
      console.error('Chyba při přidávání zákazníka:', error);
      throw error;
    }
  };

  const assignBookToCustomer = async (customerId, bookId) => {
    try {
      const response = await api.post(`/api/customers/${customerId}/book/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('Chyba při přiřazování knihy zákazníkovi:', error);
      throw error;
    }
  };

  const purchaseBooks = async () => {
    try {
      const customerResponse = await addCustomer(customerData);
      const customerId = customerResponse.idCustomer;

      for (const item of basketItems) {
        await assignBookToCustomer(customerId, item.idBook);
      }

      await BasketService.clearBasket();
      fetchBasketItems();
    } catch (error) {
      console.error('Chyba při nákupu knih:', error);
    }
  };

  const totalPrice = basketItems.reduce(
    (total, item) => total + item.price,
    0
  );

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-3xl bg-white p-8 shadow rounded-lg w-5/6 h-auto">
        <h2 className="text-2xl font-semibold mb-4">Váš košík</h2>
        {basketItems.length === 0 ? (
          <p>Váš košík je prázdný.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {basketItems.map((item) => (
              <div key={item.idBook} className="bg-white rounded shadow p-4">
                <h3 className="text-lg font-bold mb-2">{item.name}</h3>
                <p>Autor: {item.author.name + ' ' + item.author.surname}</p>
                <p>ISBN: {item.isbn}</p>
                <p>Cena: {item.price}</p>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded-md mt-2"
                  onClick={() => removeFromBasket(item.idBook)}
                >
                  Smazat
                </button>
              </div>
            ))}
          </div>
        )}

        <h2 className="text-2xl font-semibold mt-6">Informace o zákazníkovi</h2>
        <div className="flex flex-col mt-4 space-y-4">
          <div className="flex items-center">
            <label htmlFor="name" className="block w-32 font-medium text-gray-700">
              Jméno
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              value={customerData.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="surname" className="block w-32 font-medium text-gray-700">
              Příjmení
            </label>
            <input
              type="text"
              id="surname"
              name="surname"
              className="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              value={customerData.surname}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="email" className="block w-32 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input mt-1 block w-full rounded-md border-gray-300 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              value={customerData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Celková cena: {totalPrice} Kč</h2>
        </div>

        <div className="mt-6 space-x-4">
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={purchaseBooks}
          >
            Koupit
          </button>

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
            onClick={clearBasket}
          >
            Vyprázdnit košík
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketComponent;
