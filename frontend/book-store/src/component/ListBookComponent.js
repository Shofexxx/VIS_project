import React, { useEffect, useState } from 'react'
import BookService from '../service/BookService'

const ListBookComponent = () =>{

    const [bookArray, setBookArray] = useState([]);

    useEffect(()=>{
        getAllBooks();
    },[]);

    function getAllBooks(){
        BookService.getAllBooks()
        .then(res=>{setBookArray(res.data); console.log(res)})
        .catch(e=>console.log(e));
    }

    return (
        <div className='container'>
          <h2 className='text-center mb-4'>List Books</h2>
          <table className='table table-bordered table-striped'>
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Book Name</th>
                <th>ISBN</th>
                <th>Quantity</th>
                <th>Author ID</th>
              </tr>
            </thead>
            <tbody>
              {bookArray.map((book) => (
                <tr key={book.idBook}>
                  <td>{book.idBook}</td>
                  <td>{book.name}</td>
                  <td>{book.isbn}</td>
                  <td>{book.quantity}</td>
                  <td>{book.authorId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      
}
export default ListBookComponent