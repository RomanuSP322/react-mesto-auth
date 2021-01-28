import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext)

  return (
    <main className="content page-ident">
      <section className="profile">
        <div className="profile__avatar-wrapper" >
          <div className="profile__avatar-button" onClick={props.onEditAvatar} />
          <img src={currentUser.avatar} alt="Аватар" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__tittle">{currentUser.name}</h1>
          <button type="button" className="profile__edit-button" onClick={props.onEditProfile} />
          <p className="profile__subtittle">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace} />
      </section>
      <section className="places">
        {props.cards.map((item) =>
        (<Card
          card={item}
          onCardLike={props.onCardLike}
          onCardDelete={props.onCardDelete}
          onCardClick={props.onCardClick}
          key={item._id}
        />)
        )}
      </section>
    </main>
  )
}

export default Main