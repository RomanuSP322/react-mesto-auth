import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    onRegister(registerData);
  };

  return (
    <div className="login">
      <p className="login__welcome">Регистрация</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          required
          id="email"
          name="email"
          type="text"
          value={registerData.email}
          onChange={handleChange}
          placeholder="Email"
          className="login__input"
        />
        <input
          required
          id="password"
          name="password"
          type="password"
          value={registerData.password}
          onChange={handleChange}
          placeholder="Пароль"
          className="login__input"
        />
        <button type="submit" className="login__button">
          Зарегистрироваться
        </button>
      </form>

      <div className="login__signup">
        <p>Уже зарегистрированы?</p>&nbsp;
        <Link to="/register" className="login__link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
