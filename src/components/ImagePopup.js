import React from 'react';

function ImagePopup(props) {
  return (
    <div className={`popup image-popup ${props.card.link && 'popup_is-opened'}`} >
      <div className="popup__image-container">
        <button type="button" className="popup__close-button" onClick={props.onClose} />
        <img src={props.card.link} alt="Картинка Места" className="popup__image" />
        <h2 className="popup__image-title" >{props.card.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;