import React from 'react';
import { api } from '../utils/api';
import Card from './Card';

function Main(props) {

  const [userInfo, setUserInfo] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((userData) => {
        setUserInfo(userData)
      })
      .catch((err) => {
        console.log(err);
      })
    api.getCards()
      .then((cardsData) => {
        setCards(cardsData)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  return (
    <main className="content page-ident">
      <section className="profile">
        <div className="profile__avatar-wrapper" >
          <div className="profile__avatar-button" onClick={props.onEditAvatar} />
          <img src={userInfo.avatar} alt="Аватар" className="profile__avatar" />
        </div>
        <div className="profile__info">
          <h1 className="profile__tittle">{userInfo.name}</h1>
          <button type="button" className="profile__edit-button" onClick={props.onEditProfile} />
          <p className="profile__subtittle">{userInfo.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={props.onAddPlace} />
      </section>
      <section className="places">
        {cards.map((item) =>
        (<Card
          card={item}
          onCardClick={props.onCardClick}
          key={item._id}
        />)
        )}
      </section>
    </main>
  )
}

export default Main;