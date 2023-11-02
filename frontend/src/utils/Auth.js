class Auth {
  constructor() {
    this.baseUrl = 'https://api.kamille57.nomoredomainsrocks.ru';
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then(errorMessage => {
      throw new Error(`Ошибка: ${res.status} - ${errorMessage}`);
    });
  }

  register(email, password) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => this._checkResponse(response));
  }

  authorize(email, password) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => this._checkResponse(response));
  }

  checkToken() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => this._checkResponse(response));
  }
}

export default Auth;
