import React from "react";
import PopupWithForm from "../components/PopupWithForm";

function AddPlacePopup(props) {
  const nameRef = React.useRef("");
  const linkRef = React.useRef("");

  React.useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={nameRef}
        type="text"
        id="card-title"
        minLength={2}
        maxLength={30}
        className="popup__form-item popup__form-item_type_title"
        name="name"
        placeholder="Название"
        required
      />
      <span id="card-title-error" className="popup__error" />
      <input
        ref={linkRef}
        type="url"
        id="card-link"
        className="popup__form-item popup__form-item_type_img-url popup__form-item_position_bottom"
        name="link"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="card-link-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
