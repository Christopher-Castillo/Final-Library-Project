import React, { useState, useEffect } from "react";
import "./Modal.css";

const Modal = ({ closeModal, bookId }) => {
  const [bookNotes, setBookNotes] = useState("");
  const [pageNumber, setPageNumber] = useState("");

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem(bookId)) || {};
    setBookNotes(savedNotes.bookNotes || "");
    setPageNumber(savedNotes.pageNumber || "");
  }, [bookId]);

  const handleSaveNotes = () => {
    localStorage.setItem(
      bookId,
      JSON.stringify({ bookNotes: bookNotes, pageNumber: pageNumber })
    );
    closeModal();
  };

  const handleClearNotes = () => {
    setBookNotes("");
    setPageNumber("");
    localStorage.removeItem(bookId);
    closeModal();
  };

  return (
    <div className="modal-overlay">

      <div className="modal-content">
      <button className="close-button" onClick={() => closeModal(false)}>X</button>

        <h2>Book Notes</h2>
        <div className="page-number-container">
          <label htmlFor="page-number">Page Number:</label>
          <input
            type="text"
            id="page-number"
            value={pageNumber}
            onChange={(e) => setPageNumber(e.target.value)}
          />
        </div>
        <div className="book-notes-container">
          <label htmlFor="book-notes">Notes:</label>
          <textarea
            id="book-notes"
            value={bookNotes}
            onChange={(e) => setBookNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="modal-buttons">
          <button className="save-button" onClick={handleSaveNotes}>
            Save
          </button>
          <button className="clear-button" onClick={handleClearNotes}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
