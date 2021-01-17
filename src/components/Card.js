import React from 'react';

function Card(props) {

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div class="place">
      <img src={props.card.link} alt="Картинка Места" class="place__image" onClick={handleClick} />
      <button type="button" class="place__delete-button"></button>
      <div class="place__content">
        <h2 class="place__title">{props.card.name}</h2>
        <div class="place__like-wrapper">
          <button type="button" class="place__like-button"></button>
          <span class="place__like-counter">{props.card.likes.length}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;