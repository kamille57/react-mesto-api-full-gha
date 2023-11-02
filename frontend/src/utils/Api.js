class Api {
  constructor() {
    this.baseUrl = 'https://api.kamille57.nomoredomainsrocks.ru';
    this.headers = {
      'Content-Type': 'application/json'
    };
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options)
      .then(this._checkResponse);
  }

  getUserInfo() {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers,
    });
  }

  setUserInfo(user) {
    return this._request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(user)
    });
  }

  updateAvatar(avatar) {
    return this._request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify({
        avatar: avatar
      })
    });
  }

  getInitialCards() {
    return this._request(`${this.baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: this.headers
    });
  }

  addCard(data) {
    return this._request(`${this.baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this.headers,
      body: JSON.stringify(data)
    });
  }

  deleteCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers
    });
  }

  likeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      credentials: 'include',
      headers: this.headers
    });
  }

  dislikeCard(cardId) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: this.headers
    });
  }

  changeLikeCardStatus(cardId, like) {
    return this._request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: like ? 'PUT' : 'DELETE',
      credentials: 'include',
      headers: this.headers
    });
  }
}

export default Api;