import MOVIES_URL from './config';
import Api from "./Api";

class MoviesApi extends Api {
    constructor({serverUrl}) {
        super({serverUrl});
    }

    // getUserInfo() {
    //     return fetch(`${this._serverUrl}/users/me `, {
    //         method: 'GET',
    //         headers: this._headers
    //     })
    //         .then(this._checkResult);
    // }


    getAllMovies() {
        return fetch(`${this._serverUrl}`, {
            method: 'GET',
        })
            .then(super._checkResult);
    }

    // updateUserInfo(newName, newDescription) {
    //     return fetch(`${this._serverUrl}/users/me`, {
    //         method: 'PATCH',
    //         headers: this._headers,
    //         body: JSON.stringify({
    //             name: newName,
    //             about: newDescription
    //         })
    //     })
    //         .then(this._checkResult);
    // }
    //
    // sendCardInfoToServer(cardName, cardLink) {
    //     return fetch(`${this._serverUrl}/cards`, {
    //         method: 'POST',
    //         headers: this._headers,
    //         body: JSON.stringify({
    //             name: cardName,
    //             link: cardLink
    //         })
    //     })
    //         .then(this._checkResult);
    // }
    //
    // deleteCard(cardId) {
    //     return fetch(`${this._serverUrl}/cards/${cardId}`, {
    //         method: 'DELETE',
    //         headers: this._headers
    //     })
    //         .then(this._checkResult);
    // }
    //
    // _addLikeToCard(cardId) {
    //     return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
    //         method: 'PUT',
    //         headers: this._headers
    //     })
    //         .then(this._checkResult);
    // }
    //
    // _removeLikeFromCard(cardId) {
    //     return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
    //         method: 'DELETE',
    //         headers: this._headers
    //     })
    //         .then(this._checkResult);
    // }
    //
    // changeLikeCardStatus(cardId, isLiked) {
    //     if (isLiked) {
    //         return this._removeLikeFromCard(cardId);
    //     } else {
    //         return this._addLikeToCard(cardId);
    //     }
    // }
    //
    // sendNewAvatarToServer(avatarLink) {
    //     return fetch(`${this._serverUrl}/users/me/avatar`, {
    //         method: 'PATCH',
    //         headers: this._headers,
    //         body: JSON.stringify({
    //             avatar: avatarLink,
    //         })
    //     })
    //         .then(this._checkResult);
    // }
    //
    // updateTokenInHeaders() {
    //     this._headers = {
    //         'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //         'Content-Type': 'application/json'
    //     }
    // }
}

const moviesApi = new MoviesApi({
    serverUrl: MOVIES_URL
});

export default moviesApi;
