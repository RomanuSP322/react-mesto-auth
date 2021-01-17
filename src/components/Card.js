import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="place">
      <img src={props.card.link} alt="Картинка Места" className="place__image" onClick={handleClick} />
      <button type="button" className="place__delete-button"></button>
      <div className="place__content">
        <h2 className="place__title">{props.card.name}</h2>
        <div className="place__like-wrapper">
          <button type="button" className="place__like-button"></button>
          <span className="place__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;