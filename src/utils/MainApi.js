import {MAIN_API_URL} from './config';
import Api from "./Api";

class MainApi extends Api {

    constructor({serverUrl, headers}) {
        super({serverUrl});
        this._headers = headers;
    }


    // getUserInfo() {
    //     return fetch(`${this._serverUrl}/users/me `, {
    //         method: 'GET',
    //         headers: this._headers
    //     })
    //         .then(this._checkResult);
    // }



    registerNewUser(name, email, password) {
        return fetch(`${this._serverUrl}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "name" : name,
                "password": password,
                "email": email
            })
        })
            .then(this._checkResult);
    }

    loginUser(email, password) {
        return fetch(`${this._serverUrl}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                "password": password,
                "email": email
            })
        })
            .then(this._checkResult);
    }

    updateTokenInHeaders() {
        this._headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        }
    }

    getUserInfo() {
        return fetch(`${this._serverUrl}/users/me `, {
            method: 'GET',
            headers: this._headers
        })
            .then(this._checkResult);
    }

    // getSmt(res) {
    //     super._checkResult(res);
    // }


    // getUserInfo() {
    //     return fetch(`${this._serverUrl}/users/me `, {
    //         method: 'GET',
    //         headers: this._headers
    //     })
    //         .then(this._checkResult);
    // }




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

const mainApi = new MainApi({
    serverUrl: MAIN_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default mainApi;
