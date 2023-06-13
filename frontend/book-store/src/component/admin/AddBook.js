import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { BASE_URL } from "../../config/apiConfig";

const AddBook = () => {
  const { isAuthenticated, credentials } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [quantity, setQuantity] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authors, setAuthors] = useState([]);
  const [showAddAuthorForm, setShowAddAuthorForm] = useState(false);
  const [newAuthorName, setNewAuthorName] = useState('');
  const [newAuthorSurname, setNewAuthorSurname] = useState('');

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/authors`, {
          headers: {
            Authorization: isAuthenticated && credentials ? `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` : '',
          },
        });
        setAuthors(response.data);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchAuthors();
  }, [isAuthenticated, credentials]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      name: name,
      isbn: isbn,
      quantity: quantity,
      authorId: authorId,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/books`, bookData, {
        headers: {
          Authorization: isAuthenticated && credentials ? `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` : '',
        },
      });

      if (response.status === 200) {
        console.log('Book added successfully.');
        // Reset form fields
        setName('');
        setIsbn('');
        setQuantity('');
        setAuthorId('');
      } else {
        console.log('Failed to add book.');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleAuthorSelection = (e) => {
    const selectedValue = e.target.value;
    if (selectedValue === 'addAuthor') {
      setShowAddAuthorForm(true);
    } else {
      setAuthorId(selectedValue);
    }
  };

  const handleAddAuthor = async (e) => {
    e.preventDefault();

    const newAuthorData = {
      name: newAuthorName,
      surname: newAuthorSurname,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/authors`, newAuthorData, {
        headers: {
          Authorization: isAuthenticated && credentials ? `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` : '',
        },
      });

      if (response.status === 200) {
        console.log('Author added successfully.');
        setAuthors([...authors, response.data]);
        setAuthorId(response.data.idAuthor);
        setNewAuthorName('');
        setNewAuthorSurname('');
        setShowAddAuthorForm(false);
      } else {
        console.log('Failed to add author.');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleCloseAddAuthor = () => {
    setShowAddAuthorForm(false);
  };

  return (
    <div className="mt-8 container m-auto content-center">
      <h2 className="text-2xl font-bold mb-4">Přidat knihu</h2>
      <form onSubmit={handleSubmit} className="max-w-sm">
        <div className="mb-4">
          <label className="block mb-2">
            Jméno:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            ISBN:
            <input
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Počet:
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block mb-2">
            Author:
            <select
              value={authorId}
              onChange={handleAuthorSelection}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select an author</option>
              {authors.map((author) => (
                <option key={author.idAuthor} value={author.idAuthor}>
                  {author.name} {author.surname}
                </option>
              ))}
              <option value="addAuthor">Add Author</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>

      {showAddAuthorForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold mb-4">Add Author</h2>
            <button
              type="button"
              onClick={handleCloseAddAuthor}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Close
            </button>
            <form onSubmit={handleAddAuthor}>
              <div className="mb-4">
                <label className="block mb-2">
                  Name:
                  <input
                    type="text"
                    value={newAuthorName}
                    onChange={(e) => setNewAuthorName(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>
              </div>
              <div className="mb-4">
                <label className="block mb-2">
                  Surname:
                  <input
                    type="text"
                    value={newAuthorSurname}
                    onChange={(e) => setNewAuthorSurname(e.target.value)}
                    className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </label>
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Add Author
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBook;
