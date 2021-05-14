import React from "react";
import PopupWithForm from "../components/PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen]);

  function handleNameUpdater(e) {
    setName(e.target.value);
  }

  function handleDescriptionUpdater(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }


  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="name"
        onChange={handleNameUpdater}
        value={name}
        minLength={2}
        maxLength={40}
        className="popup__form-item popup__form-item_type_name"
        name="name"
        placeholder="Имя"
        required
      />
      <span id="name-error" className="popup__error" />
      <input
        type="text"
        id="about"
        onChange={handleDescriptionUpdater}
        value={description}
        minLength={2}
        maxLength={200}
        className="popup__form-item popup__form-item_type_about popup__form-item_position_bottom"
        name="about"
        placeholder="О себе"
        required
      />
      <span id="about-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
