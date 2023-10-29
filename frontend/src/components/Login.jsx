import React, { useState } from 'react';

function Login({ onLogin }) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const { email, password } = formValue;
        onLogin(email, password)
    }

    return (
        <div className="auth">
            <h2 className="auth__welcome">Вход</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input className="auth__input" required id="email" name="email" type="text" placeholder="Email" value={formValue.email} onChange={handleChange} />
                <input className="auth__input" required id="password" name="password" type="password" placeholder="Пароль" value={formValue.password} onChange={handleChange} />
                <button type="submit" className="auth__btn">Войти</button>
            </form>
        </div>
    );
}

export default Login;