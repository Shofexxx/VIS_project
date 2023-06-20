import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { BASE_URL } from '../../config/apiConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = () => {
  const { isAuthenticated, credentials, userRole } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [isbn, setIsbn] = useState('');
  const [price, setPrice] = useState(0.0);
  const [quantity, setQuantity] = useState('');
  const [author, setAuthor] = useState({
    idAuthor: '',
    name: '',
    surname: '',
  });
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
      idBook: '',
      name: name,
      isbn: isbn,
      price: price,
      quantity: quantity,
      author: author,
    };

    try {
      const response = await axios.post(`${BASE_URL}/api/books`, bookData, {
        headers: {
          Authorization: isAuthenticated && credentials ? `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` : '',
        },
      });

      if (response.status === 200) {
        toast.success("Knížka úspěšně přidána.")
        setName('');
        setIsbn('');
        setPrice('');
        setQuantity('');
        setAuthor({
          idAuthor: '',
          name: '',
          surname: '',
        });
      } else {
        toast.error("Knížka nepřidána.")
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
      setAuthor((prevAuthor) => ({
        ...prevAuthor,
        idAuthor: selectedValue,
      }));
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
        toast.success("Autor úspěšně přidán.")
        setAuthors([...authors, response.data]);
        setAuthor({
          idAuthor: response.data.idAuthor,
          name: response.data.name,
          surname: response.data.surname,
        });
        setNewAuthorName('');
        setNewAuthorSurname('');
        setShowAddAuthorForm(false);
      } else {
        toast.error("Autor nepřidána.")
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleCloseAddAuthor = () => {
    setShowAddAuthorForm(false);
  };
  if (!isAuthenticated) {
    return <div>Pro přístup na tuto stránku se musíte přihlásit jako správce.</div>;
  }

  if (userRole !== 'admin') {
    return <div>Přístup na tuto stránku je omezen pouze na administrátory.</div>;
  }
  return (
    <div className="mt-8 container m-auto content-center items-center">
      <ToastContainer position="bottom-right" />
      <h2 className="text-2xl font-bold mb-4 text-center">Přidat knihu</h2>
      <form onSubmit={handleSubmit} className="w-1/3 m-auto">
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
            Cena:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
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
            Autor:
            <select
              value={author.idAuthor}
              onChange={handleAuthorSelection}
              className="border border-gray-300 rounded-md py-2 px-4 w-full focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Vyberte autora</option>
              {authors.map((author) => (
                <option key={author.idAuthor} value={author.idAuthor}>
                  {author.name} {author.surname}
                </option>
              ))}
              <option value="addAuthor" className='bg-green-400'>Přidat autora</option>
            </select>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Přidat knihu
        </button>
      </form>

      {showAddAuthorForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-lg font-bold mb-4">Přidat autora</h2>
            <button
              type="button"
              onClick={handleCloseAddAuthor}
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700"
            >
              Zavřít
            </button>
            <form onSubmit={handleAddAuthor}>
              <div className="mb-4">
                <label className="block mb-2">
                  Jméno:
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
                  Příjmení:
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
                Přidat autora
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddBook;