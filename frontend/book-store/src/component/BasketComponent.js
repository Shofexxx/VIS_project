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
      console.error('Error adding customer:', error);
      throw error;
    }
  };

  const assignBookToCustomer = async (customerId, bookId) => {
    try {
      console.log(customerId + "test" +bookId)
      const response = await api.post(`/api/customers/${customerId}/book/${bookId}`);
      return response.data;
    } catch (error) {
      console.error('Error assigning book to customer:', error);
      throw error;
    }
  };

  const purchaseBooks = async () => {
    try {
      // Create a new customer
      const customerResponse = await addCustomer(customerData);
      const customerId = customerResponse.idCustomer;

      // Assign books to the customer
      for (const item of basketItems) {
        await assignBookToCustomer(customerId, item.idBook);
      }

      await BasketService.clearBasket();
      fetchBasketItems();
    } catch (error) {
      console.error('Error purchasing books:', error);
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

        <h2 className="text-2xl font-semibold mt-6">Customer Information</h2>
        <div className="mt-4">
          <label htmlFor="name" className="block font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input mt-1 block w-full"
            value={customerData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="surname" className="block font-medium text-gray-700">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            className="form-input mt-1 block w-full"
            value={customerData.surname}
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-4">
          <label htmlFor="email" className="block font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input mt-1 block w-full"
            value={customerData.email}
            onChange={handleInputChange}
          />
        </div>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
          onClick={purchaseBooks}
        >
          Purchase
        </button>

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-2"
          onClick={clearBasket}
        >
          Clear Basket
        </button>
      </div>
    </div>
  );
};

export default BasketComponent;