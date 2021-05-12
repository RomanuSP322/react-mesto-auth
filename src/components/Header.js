import React from "react";
import logo from "../images/header__logo.svg";
import { Route, Link, Switch } from "react-router-dom";

function Header(props) {
  const signOut = props.onSignOut;
  const isLoggedIn = props.isLoggedIn;
  const email = props.email;
  return (
    <header className="header">
      <img src={logo} alt="Логотип сервиса" className="header__logo" />
      {isLoggedIn && (
        <div className="header__email-container">
          <p className="header__email">{email}</p>
          <Link
            to="/sign-in"
            onClick={signOut}
            className="header__link header__exit-link "
          >
            Выйти
          </Link>
        </div>
      )}
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        </Route>
      </Switch>
    </header>
  );
}
export default Header;
