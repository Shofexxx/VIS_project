import React, { useEffect, useState } from 'react';
import BookService from '../service/BookService';
import { Link } from 'react-router-dom';
import SearchComponent from './SearchComponent';

const ListBookComponent = () => {
  const [bookArray, setBookArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(9);

  useEffect(() => {
    getAllBooks();
  }, []);

  function getAllBooks() {
    BookService.getAllBooks()
      .then((res) => {
        setBookArray(res.data);
        console.log(res);
      })
      .catch((e) => console.log(e));
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = bookArray.slice(indexOfFirstBook, indexOfLastBook);

  const renderBooks = currentBooks.map((book) => (
    <Link
      to={`/books/${book.idBook}`}
      key={book.idBook}
      className="hover:scale-105 transition-all"
    >
      <div className="bg-white rounded shadow p-4">
        
        <h3 className="text-lg font-bold mb-2">{book.name}</h3>
        <div className="flex justify-between mb-2">
          <span className="font-bold">ISBN:</span>
          <span>{book.isbn}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="font-bold">Quantity:</span>
          <span>{book.quantity}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Author:</span>
          <span>{book.author.name} {book.author.surname}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-bold">Cena:</span>
          <span>{book.price}</span>
        </div>
      </div>
    </Link>
  ));

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(bookArray.length / booksPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map((number) => (
    <li
      key={number}
      className={`${
        number === currentPage ? 'font-bold' : ''
      } inline-block mr-2 text-blue-500 cursor-pointer`}
      onClick={() => handlePageChange(number)}
    >
      {number}
    </li>
  ));

  return (
    <div className="container mx-auto py-8">
      <SearchComponent />
      <h2 className="text-2xl font-bold mb-4 text-[#9dce67] ">Knihy</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {renderBooks}
      </div>
      <ul className="mt-4">
        <li
          className={`${
            currentPage === 1 ? 'invisible' : ''
          } inline-block mr-2 text-blue-500 cursor-pointer`}
          onClick={handlePrevPage}
        >
          &lt; 
        </li>
        {renderPageNumbers}
        <li
          className={`${
            currentPage === pageNumbers.length ? 'invisible' : ''
          } inline-block mr-2 text-blue-500 cursor-pointer`}
          onClick={handleNextPage}
        >
         &gt;
        </li>
      </ul>
    </div>
  );
};

export default ListBookComponent;