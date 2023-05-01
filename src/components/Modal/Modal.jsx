import "./Modal.css"
import { useState, useEffect } from "react";

function Modal({ closeModal, bookId }) {
  const [page, setPage] = useState('');
  const [notes, setNotes] = useState('');

  // Save notes for a book
  function saveNotes(bookId, notes) {
    let allNotes = JSON.parse(localStorage.getItem('bookNotes')) || {};
    allNotes[bookId] = notes;
    localStorage.setItem('bookNotes', JSON.stringify(allNotes));
  }
  
  // Get notes for a book
  function getNotes(bookId) {
    let allNotes = JSON.parse(localStorage.getItem('bookNotes')) || {};
    return allNotes[bookId];
  }
  
  // Save notes when 'Save' button is clicked
  const handleSave = () => {
    saveNotes(bookId, {page, notes});
    closeModal(false);
  }
  
  // Clear page and notes when 'Clear' button is clicked
  const handleClear = () => {
    setPage('');
    setNotes('');
  }
  
  // Get notes for the current book when the modal opens
  useEffect(() => {
    const savedNotes = getNotes(bookId);
    if (savedNotes) {
      setPage(savedNotes.page);
      setNotes(savedNotes.notes);
    }
  }, [bookId]);
  
  return (
    
    <div className='modalBackground'>
      <div className='modalContainer'>
        <button onClick={() => closeModal(false)}>X</button>
        <div className='title'>
          <h1>Book Notes</h1>
        </div>
        <div className='body'>
          <input type='text' placeholder='Page Number' value={page} onChange={(e) => setPage(e.target.value)} />
          <textarea placeholder='Enter your notes here...' value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
        </div>
        <div className='footer'>
          <button onClick={handleClear}> Clear </button>
          <button onClick={handleSave}> Save </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;