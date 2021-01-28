import React from "react";
import PopupWithForm from "../components/PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef("");

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        id="avatar-link"
        className="popup__form-item popup__form-item_type_avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="avatar-link-error" className="popup__error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
