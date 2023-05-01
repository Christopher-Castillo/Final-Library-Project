import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookDetails.css";
import {FaArrowLeft} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const URL = "https://openlibrary.org/works/";


const BookDetails = () => {
  const [books, setBooks] = useState([]);
  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}.json?details=true`);
        const data = await response.json();
        console.log('API response:', data);
        
        if (data) {
          const {description, title, covers, subject_places, subject_times} = data;
          const newBook = {
            description: description,
            title: title,
            cover_img: covers ? `https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg` : coverImg,
            subject_places: subject_places ? subject_places.join(", ") : "No subject places found",
            subject_times: subject_times ? subject_times.join(", ") : "No subject places found",
          };
          
          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch(error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if (loading) return <Loading />;

  const handleAddToBookshelf = (bookId, cover_img) => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    if (!bookshelf.includes(bookId)) {
      bookshelf.push(bookId);
      localStorage.setItem("bookshelf", JSON.stringify(bookshelf));
      const newBook = { id: bookId, imageUrl: cover_img };
      console.log(newBook); // <-- add this line to print newBook object in the console
      const books = JSON.parse(localStorage.getItem("books")) || [];
      const bookExists = books.some((book) => book.id === bookId);
      if (!bookExists) {
        const updatedBooks = [...books, newBook];
        localStorage.setItem("books", JSON.stringify(updatedBooks));
      }
    }
  };


  const handleRemoveFromBookshelf = (bookId) => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || [];
    const updatedBookshelf = bookshelf.filter((id) => id !== bookId);
    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
  
    const books = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = books.filter((book) => book.id !== bookId);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  
    setBooks(updatedBooks); // <-- Add this line to update the state with the new array of books
  };
  



  return (
    <section className='book-details'>
      <div className='container'>
        <button type='button' className='flex flex-c back-btn' onClick={() => navigate("/book")}>
          <FaArrowLeft size = {22} />
          <span className='fs-18 fw-6'>Go Back</span>
        </button>

        <div className='book-details-content grid'>
          <div className='book-details-img'>
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className='book-details-info'>
            <div className='book-details-item title'>
              <span className='fw-6 fs-24'>{book?.title}</span>
            </div>
            <div className='book-details-item description'>
              <span>{book?.description}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Places: </span>
              <span className='text-italic'>{book?.subject_places}</span>
            </div>
            <div className='book-details-item'>
              <span className='fw-6'>Subject Times: </span>
              <span className='text-italic'>{book?.subject_times}</span>
            </div>
            <div className='ADbuttons'>
            <div className='AddBookdiv'>
            <button className='AddBook' onClick={() => handleAddToBookshelf(id, book?.cover_img)}>Add to Bookshelf</button>
            </div>
            <div className='RemoveBookdiv'>
              <button className='RemoveBook' onClick={() => handleRemoveFromBookshelf(id)} >Remove from Bookshelf</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BookDetails;
