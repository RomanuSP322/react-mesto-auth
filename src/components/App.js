import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";
import ImagePopup from "../components/ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { api } from "../utils/api";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../components/Login";
import Register from "../components/Register";
import InfoTooltip from "../components/InfoTooltip";
import * as apiAuth from "../utils/apiAuth";
import succesStatus from "../images/status__success.svg";
import errorStatus from "../images/status__error.svg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({
    name: "",
    link: "",
  });
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const history = useHistory();
  const [statusInfo, setStatusInfo] = React.useState({
    statusIcon: "",
    statusTitle: "",
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState('');


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllPopus() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({ name: "", link: "" });
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userData) {
    api
      .editProfile(userData, token)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopus());
  }

  React.useEffect(() => {
    api
      .getUserInfo(token)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  function handleUpdateAvatar(userData) {
    api
      .editAvatar(userData, token)
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopus());
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .putLike(card._id, token)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLike(card._id, token)
        .then((newCard) => {
          const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
          setCards(newCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("./main");
    }
  }, [isLoggedIn]);

  React.useEffect(() => {
    api
      .getCards(token)
      .then((cardsData) => {
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  function handleDeleteCard(card) {
    api
      .deleteCard(card._id, token)
      .then((newCard) => {
        const newCards = cards.filter((c) =>
          c._id === card._id ? !newCard : c
        );
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .editCard(card, token)
      .then((newCard) => {
        setCards([...cards, newCard]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => closeAllPopus());
  }

  function handleRegister(data) {
    return apiAuth
      .register(data)
      .then(() =>
        setStatusInfo({
          statusIcon: succesStatus,
          statusTitle: "???? ?????????????? ????????????????????????????????????!",
        })
      )
      .then(() => {
        history.push("./sign-in");
      })
      .catch(() =>
        setStatusInfo({
          statusIcon: errorStatus,
          statusTitle: "??????-???? ?????????? ???? ??????!???????????????????? ?????? ??????.",
        })
      )
      .finally(() => setIsInfoTooltipOpen(true));
  }

  function handleLogin(data) {
    return apiAuth.authorize(data).then(({ token }) => {
      setIsLoggedIn(true);
      setToken(token);
      localStorage.setItem("jwt", token);
      setEmail(data.email);
    });
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    setToken(jwt);
    if (!jwt) {
      history.push('./sign-in');
      return;
    }

    apiAuth.getContent(jwt).then(( data ) => {
      setEmail(data.email);
      setIsLoggedIn(true);
    });
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    localStorage.setItem("jwt", "");
    setEmail("");
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header
            onSignOut={handleSignOut}
            email={email}
            isLoggedIn={isLoggedIn}
          />
          <InfoTooltip
            onClose={closeAllPopus}
            isOpen={isInfoTooltipOpen}
            statusInfo={statusInfo}
          />
          <Switch>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} email={email} />
            </Route>
            <Route path="/sign-up">
              <Register onRegister={handleRegister} />
            </Route>
            <ProtectedRoute
              path="/main"
              component={Main}
              loggedIn={isLoggedIn}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleDeleteCard}
            />
          </Switch>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopus}
            onUpdateUser={handleUpdateUser}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopus}
            onAddPlace={handleAddPlaceSubmit}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopus}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopus} />

          {isLoggedIn && <Footer />}
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
