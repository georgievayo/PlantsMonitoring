import { HttpClient, api } from '../httpClient';

export function signUp(user) {
    return function (dispatch) {
        return HttpClient.post(`${api.USERS}`, user)
            .then(() => dispatch(signUpSuccess()));
    };
}

export function signIn(user) {
    return function (dispatch) {
        return HttpClient.post(`${api.USERS}/login`, user)
            .then(response => {
                sessionStorage.setItem('token', response.token);
                dispatch(signInSuccess());
            });
    };
}

function signUpSuccess() {
    return {
        type: 'SIGN_UP_SUCCESS'
    };
}

function signInSuccess(token) {
    return {
        type: 'SIGN_IN_SUCCESS'
    };
}