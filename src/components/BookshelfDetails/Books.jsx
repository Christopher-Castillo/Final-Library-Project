import React, { useState, useEffect } from "react";
import "./BookshelfList.css";
import Modal from "../Modal/Modal";
const Books = () => {
  const [openModal, setOpenModal] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(savedBooks);
  }, []);

  const handleRemoveFromBookshelf = (bookId) => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    const updatedBookshelf = bookshelf.filter((id) => id !== bookId);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));

    const books = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = books.filter((book) => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(updatedBooks));

    setBooks(updatedBooks);
  };

  const handleOpenModal = (bookId) => {
    setOpenModal(bookId);
  };

  const handleCloseModal = () => {
    setOpenModal(null);
  };

  return (
    <div className="book-list">
      <h1>Bookshelf</h1>
      <div> 
        <p>Here are your saved books! </p>
        <p> PS. Try not to save books without covers</p>
      </div>
      {books.length > 0 ? (
        <div className="book-grid">
          {books.map((book, index) => (
            <div key={index} className="book-item">
              {book.imageUrl ? (
                <img src={book.imageUrl} alt="book cover" />
              ) : null}
              <p>{book.title} </p>
              <p>{book.author} </p>
              <div className="NotesButton"> 
                <button onClick={() => handleOpenModal(book.id)}> 
                  Notes
                </button>
              </div>
              <div className="RemoveBook">
                <button onClick={() => handleRemoveFromBookshelf(book.id)}>Remove</button>
              </div>
            </div>
          ))}
          {openModal && (
            <Modal closeModal={handleCloseModal} bookId={openModal} />
          )}
        </div>
      ) : (
        <p>No books saved in your bookshelf yet!</p>
      )}
    </div>
  );
};

export default Books;
