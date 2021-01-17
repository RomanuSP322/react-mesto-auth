import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });

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
    setSelectedCard({ name: '', link: '' });
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />
        <Footer />
        <PopupWithForm
          name="edit"
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopus}
        >
          <input type="text" id="name" minLength={2} maxLength={40} className="popup__form-item popup__form-item_type_name" name="name" placeholder="Имя" required />
          <span id="name-error" className="popup__error" />
          <input type="text" id="about" minLength={2} maxLength={200} className="popup__form-item popup__form-item_type_about popup__form-item_position_bottom" name="about" placeholder="О себе" required />
          <span id="about-error" className="popup__error" />
        </PopupWithForm>

        <PopupWithForm
          name="add"
          title="Новое место"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopus}
        >
          <input type="text" id="card-title" minLength={2} maxLength={30} className="popup__form-item popup__form-item_type_title" name="name" placeholder="Название" required />
          <span id="card-title-error" className="popup__error" />
          <input type="url" id="card-link" className="popup__form-item popup__form-item_type_img-url popup__form-item_position_bottom" name="link" placeholder="Ссылка на картинку" required />
          <span id="card-link-error" className="popup__error" />
        </PopupWithForm>

        <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopus}
        >
          <input type="url" id="avatar-link" className="popup__form-item popup__form-item_type_avatar" name="avatar" placeholder="Ссылка на картинку" required />
          <span id="avatar-link-error" className="popup__error" />
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopus} />
      </div>
    </div>

  );
}

export default App;
