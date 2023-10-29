class Auth {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
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
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    })
      .then(response => this._checkResponse(response));
  }

  checkToken(token) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => this._checkResponse(response));
  }
}

export default Auth;
