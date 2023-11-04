import React from 'react';
import logo from '../images/logo.svg';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';

function Header({ email, signOut }) {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <header className="header">
            <img className="header__logo" src={logo} alt="Логотип сайта." />
            <div className="header__container">
              <p className='header__email'>{email}</p>
              <NavLink to="/sign-in" className="header__btn" onClick={signOut}>Выйти</NavLink>
            </div>
          </header>
        }
      />
      <Route
        path="/sign-up"
        element={
          <header className="header">
            <img className="header__logo" src={logo} alt="Логотип сайта." />
            <div className="header__container">
              <p className='header__email'></p>
              <NavLink to="/sign-in" className="header__btn">Войти</NavLink>
            </div>
          </header>
        }
      />
      <Route
        path="/sign-in"
        element={
          <header className="header">
            <img className="header__logo" src={logo} alt="Логотип сайта." />
            <div className="header__container">
              <p className='header__email'></p>
              <NavLink to="/sign-up" className="header__btn">Регистрация</NavLink>
            </div>
          </header>
        }
      />
    </Routes>
  );
}

export default Header;