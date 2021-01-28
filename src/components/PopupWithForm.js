import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.name}-popup ${props.isOpen && 'popup_is-opened'}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" onClick={props.onClose} />
        <h2 className="popup__tittle">{props.title}</h2>
        <form onSubmit={props.onSubmit} id="edit" name={`popup-${props.name}-form`} className={`popup__form popup__form__type_${props.name} popup__form-container`}>
          {props.children}
          <button type="submit" className="popup__save-button">Сохранить</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;