import React from 'react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';


function Register({ onRegister }) {

    const navigate = useNavigate();

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value
        })
    }

    function handleEnter() {
        navigate('/sign-in');
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = userData;
        onRegister(email, password);
    }

    return (
        <div className="auth">
            <h2 className="auth__welcome">
                Регистрация
            </h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input className="auth__input" required id="email" name="email" type="email" placeholder="email@mail.com" value={userData.email} onChange={handleChange} />
                <input className="auth__input" required id="password" name="password" type="password" placeholder="••••••••••" value={userData.password} onChange={handleChange} />
                <button type="submit" className="auth__btn">Зарегистрироваться</button>

            </form>
            <div className="auth__signin">
                <p className="auth__signin_text">Уже зарегистрированы?</p>
                <NavLink to="/sign-in" className="auth__signin_link" onClick={handleEnter}>Войти</NavLink>
            </div>
        </div>
    )
}

export default Register;