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

  getUserInfo(token) {
    return fetch(`${this._url}users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;  charset=utf-8'
      }
    })
      .then(this._response)
  }


  getCards(token) {
    return fetch(`${this._url}cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;  charset=utf-8'
      }
    })
      .then(this._response)
  }


  editProfile(data, token) {
    return fetch(`${this._url}users/me`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;  charset=utf-8'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(this._response)
  }

  editAvatar(data, token) {
    return fetch(`${this._url}users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;  charset=utf-8'
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    })
      .then(this._response)
  }

  editCard(data, token) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;  charset=utf-8'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(this._response)
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;  charset=utf-8'
      }
    })
      .then(this._response)
  }

  putLike(cardId, token) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;  charset=utf-8'
      }
    })
      .then(this._response)
  }

  deleteLike(cardId, token) {
    return fetch(`${this._url}cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json;  charset=utf-8'
      }
    })
      .then(this._response)
  }
}

export const api = new Api({
  url: 'https://api.mesto.prs.nomoredomains.monster/',

})
