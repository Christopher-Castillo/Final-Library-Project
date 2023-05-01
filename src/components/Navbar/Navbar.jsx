 import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Navbar.css";
import logoImg from "../../images/undrawbook.svg";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, Providers } from "../config/firebase"

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const handleNavbar = () => setToggleMenu(!toggleMenu);

  const signOutOnClick = async () => {
    await signOut(auth);
    setCurrentUser(null);
    navigate('/');
  }

  const signInOnClick = async () => {
    const response = await signInWithPopup(auth, Providers.google);
    if (response.user) {
      setCurrentUser(response.user);
      navigate('/');
    }
  }

  return (
    <nav className='navbar' id="navbar">
      <div className='container navbar-content flex'>
        <div className='brand-and-toggler flex flex-sb'>
          <Link to="/" className='navbar-brand flex'>
            <img src={logoImg} alt="site logo" />
            <span className='text-uppercase fw-7 fs-24 ls-1'>Digibrary</span>
          </Link>
          <button className='navbar-toggler-btn' onClick={handleNavbar}>
            <HiOutlineMenuAlt3 size={35} style={{
              color: `${toggleMenu ? "#fff" : "#010101"}`
            }} />
          </button>
        </div>
        <div className={toggleMenu ? "navbar-collapse show-navbar-collapse" : "navbar-collapse"}>
          <ul className="navbar-nav">
            <li className='nav-item'>
              <Link to="/" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Home</Link>
            </li>
            <li className='nav-item'>
              {currentUser ? (
                <Link to="/bookshelf" className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Bookshelf</Link>
              ) : (
                <button onClick={signInOnClick} className='nav-link text-uppercase text-white fs-22 fw-6 ls-1'>Bookshelf</button>
              )}
            </li  >
            {
              currentUser ?
                <li className='nav-item'>
                  <button className='nav-link text-uppercase text-white fs-22 fw-6 ls-1' onClick={signOutOnClick}>
                    Sign Out
                  </button>
                </li>
                :
                <li className='nav-item'>
                  <button className='nav-link text-uppercase text-white fs-22 fw-6 ls-1' onClick={signInOnClick}>
                    Login
                  </button>
                </li>
            }

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;