import React from 'react';
import AuthProvider from './component/AuthContext';
import ListBookComponent from './component/ListBookComponent';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginFormComponent from './component/LoginFormComponent';
import AdminComponent from './component/AdminComponent';
import Home from './component/Home';
import './css/index.css';
import Header from './component/Header'
import AddBook from './component/admin/AddBook';
import BookDetails from './component/BookDetailsComponent';
import { BasketProvider } from './component/BasketContext';
import BasketComponent from './component/BasketComponent';

function App() {
  return (
    <AuthProvider>
      <BasketProvider>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<ListBookComponent />} />
          <Route path="/login" element={<LoginFormComponent />} />
          <Route path="/admin" element={<AdminComponent />} />
          <Route exact path="/admin/add-book" element={<AddBook />} />
          <Route path="/books/:bookId" element={<BookDetails />} />
          <Route path="/basket" element={<BasketComponent />} />
        </Routes>
      </BrowserRouter>
      </BasketProvider>
    </AuthProvider>
  );
}

export default App;
