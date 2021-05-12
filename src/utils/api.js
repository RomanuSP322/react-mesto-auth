class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _response(res) {
    if (res.ok) {

      return res.json();
    } else {
      return Promise.reject(`Произошла ошибка: ${res.status}`)
    }
  }

  getUserInfo() {
    return fetch(`${this._url}users/me`, {
      headers: this._headers
    })
      .then(this._response)
  }


  getCards() {
    return fetch(`${this._url}cards`, {
      headers: this._headers
    })
      .then(this._response)
  }


  editProfile(data) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._response)
  }

  editAvatar(data) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._response)
  }

  editCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._response)
  }

  deleteCard(cardId) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._response)
  }

  putLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._response)
  }

  deleteLike(cardId) {
    return fetch(`${this._url}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._response)
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-18/',
  headers: {
    authorization: 'a0d383a9-c142-4537-8a74-fa13ea684d91',
    'Content-Type': 'application/json'
  }
})

