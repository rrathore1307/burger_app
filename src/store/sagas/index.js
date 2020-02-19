import {takeEvery} from 'redux-saga/effects';
import {AUTH_INITIAT, AUTH_CHECKOUT_TIME, AUTH_USER_SAGA} from '../actions/actionTypes'
import {logoutSaga, checkAuthSaga, authUserSaga} from './auth'
export function* watchAuth() {
    console.log('call AUTH_INITIAT--')
    yield takeEvery(AUTH_INITIAT, logoutSaga)
    yield takeEvery(AUTH_CHECKOUT_TIME, checkAuthSaga)
    yield takeEvery(AUTH_USER_SAGA, authUserSaga)
}