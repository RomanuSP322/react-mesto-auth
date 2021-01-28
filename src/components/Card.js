import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `place__delete-button ${ isOwn ? "place__delete-button_active" : ""}`;
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `place__like-button ${isLiked ? "place__like-button_active" : "" }`;

  return (
    <div className="place">
      <img
        src={props.card.link}
        alt="Картинка Места"
        className="place__image"
        onClick={handleClick}
      />
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      ></button>
      <div className="place__content">
        <h2 className="place__title">{props.card.name}</h2>
        <div className="place__like-wrapper">
          <button
            type="button"
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
          <span className="place__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
