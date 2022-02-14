class Api {
  constructor(content) {
    this._baseUrl = content.baseUrl;
  }

  _setHeaders(){
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }

  _checkResponse(res){
    if (res.ok) {
      return res.json();
    }
    // если ошибка, отклоняем промис
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards(){
    return fetch(`${this._baseUrl}cards`, {
      method: 'GET',
      headers: this._setHeaders()
    })
    .then(this._checkResponse)
  }

  setCard(cardLink, cardName){
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._setHeaders(),
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
      headers: this._setHeaders()
    })
    .then(this._checkResponse)
  }

  getAllInfo(){
    return Promise.all([this.getInitialCards(), this.getUserInfo()])
  }

  setUserProfile(profileName, profileDescription){
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._setHeaders(),
      body: JSON.stringify({
        name: profileName,
        about: profileDescription
      })
    })
    .then(this._checkResponse)
  }

  putCardLikes(cardID) {
    return fetch(`${this._baseUrl}cards/${cardID}/likes`, {
      method: 'PUT',
      headers: this._setHeaders(),
      body: JSON.stringify({
        _id: cardID
      })
    })
    .then(this._checkResponse)
  }

  deleteCardLikes(likeID) {
    return fetch(`${this._baseUrl}cards/${likeID}/likes`, {
      method: 'DELETE',
      headers: this._setHeaders(),
      body: JSON.stringify({
        _id: likeID
      })
    })
    .then(this._checkResponse)
  }

  setUserAvatar(userPhoto) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._setHeaders(),
      body: JSON.stringify({
        avatar: userPhoto
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(cardID) {
    return fetch(`${this._baseUrl}cards/${cardID}`, {
      method: 'DELETE',
      headers: this._setHeaders(),
      body: JSON.stringify({
        _id: cardID
      })
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://api.juliape4nikova.nomoredomains.work/'
});

export default api;