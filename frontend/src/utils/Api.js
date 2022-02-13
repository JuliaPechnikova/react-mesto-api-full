
class Api {
  constructor(content) {
    this._baseUrl = content.baseUrl;
    this._headers = content.headers;
  }

  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  setCard(cardLink, cardName){
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        link: cardLink,
        name: cardName
      })
    })
    .then(this._checkResponse)
  }

  getUserInfo(){
    return fetch(`${this._baseUrl}users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  getAllInfo(){
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  setUserProfile(profileName, profileDescription){
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: profileName,
        about: profileDescription
      })
    })
    .then(this._checkResponse)
  }

  putCardLikes(cardID) {
    return fetch(`${this._baseUrl}cards/likes/${cardID}`, {
      method: 'PUT',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardID
      })
    })
    .then(this._checkResponse)
  }

  deleteCardLikes(likeID) {
    return fetch(`${this._baseUrl}cards/likes/${likeID}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: likeID
      })
    })
    .then(this._checkResponse)
  }

  setUserAvatar(userPhoto) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: userPhoto
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}cards/${cardID}`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        _id: cardID
      })
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://api.juliape4nikova.nomoredomains.work',
  headers: {
    //'authorization': 'f941cb39-a05b-48d7-86db-8f1e836b871d',
    'Content-Type': 'application/json'
  }
});

export default api;