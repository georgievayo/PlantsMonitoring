import { HttpClient, api } from '../httpClient';

export function signUp(user) {
    return function (dispatch) {
        return HttpClient.post(`${api.USERS}`, user, false)
            .then(() => dispatch(signUpSuccess()));
    };
}

export function signIn(user) {
    return function (dispatch) {
        return HttpClient.post(`${api.USERS}/login`, user, false)
            .then(response => {
                sessionStorage.setItem('token', response.token);
                dispatch(signInSuccess());
            })
            .catch(err => {
                dispatch(signInFailed());
            });
    };
}

function signUpSuccess() {
    return {
        type: 'SIGN_UP_SUCCESS'
    };
}

function signInSuccess() {
    return {
        type: 'SIGN_IN_SUCCESS'
    };
}

function signInFailed() {
    return {
        type: 'SIGN_IN_FAILED'
    };
}