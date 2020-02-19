import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions/index'
import axios from 'axios'
export function* logoutSaga(action) {
    console.log('logout time out')
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userId');
    yield put(actions.logoutSucceed())
}

export function* checkAuthSaga(action) {
    console.log('checkAuthSaga call')
    // yield delay(action.expireInTime);
    yield delay(10000);
    yield put(actions.authLogout());
}

export function* authUserSaga(action) {
    console.log(action)
    yield put(actions.authStart())
    const data = {
        email: action.email,
        password: action.password
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDEbT71-JJUwj_xvBEfR-ZsWvFI3nk-WmY'
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDEbT71-JJUwj_xvBEfR-ZsWvFI3nk-WmY'
    }
    try {
        let response = yield axios.post(url, data)
        const expirationDate = yield new Date(new Date().getTime + 3600 * 1000)
        yield localStorage.setItem('expirationDate', expirationDate)
        yield localStorage.setItem('token', response.data.idToken)
        yield localStorage.setItem('userId', response.data.localId)
        yield put(actions.authSuccess(response.data.idToken, response.data.localId))
        yield put(actions.checkAuthTimeout(response.data.expiresIn))
    }
    catch (error) {
        yield put(actions.authFail(error.response.data.error))
    }
}