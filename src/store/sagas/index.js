import {takeEvery} from 'redux-saga/effects';
import {AUTH_INITIAT} from '../actions/actionTypes'
import {logoutSaga} from './auth'
export function* watchAuth() {
    yield takeEvery(AUTH_INITIAT, logoutSaga)
}