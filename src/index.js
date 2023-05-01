import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter, Routes, Route
} from 'react-router-dom';
import { AppProvider } from './context.';
import './index.css';
import Home from './pages/Home/Home';
import Bookshelf from './pages/Bookshelf/Bookshelf';
import BookList from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import { Auth0Provider } from '@auth0/auth0-react';  


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-g7b2flw55pr3kj6r.us.auth0.com"
    clientId='QZAdaY2ehZRGShoW2C7gjGZUeeiAWZxs'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
  <AppProvider>
    <BrowserRouter>
      <Routes>
        <Route path = "/" element = {<Home />}>
          <Route path = "bookshelf" element = {<Bookshelf />} />
          <Route path = "book" element = {<BookList />} />
          <Route path = "/book/:id" element = {<BookDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AppProvider>
  </Auth0Provider>
);

