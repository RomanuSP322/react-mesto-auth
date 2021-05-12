import React, { useState } from "react";

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    password: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }
    onLogin(loginData);
  };

  return (
    <div className="login">
      <p className="login__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          required
          id="email"
          name="email"
          type="email"
          value={loginData.email}
          onChange={handleChange}
          placeholder="Email"
          className="login__input"
        />

        <input
          required
          id="password"
          name="password"
          type="password"
          value={loginData.password}
          onChange={handleChange}
          placeholder="Пароль"
          className="login__input"
        />

        <button type="submit" className="login__button">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
