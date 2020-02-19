import {takeEvery} from 'redux-saga/effects';
import {AUTH_INITIAT, AUTH_CHECKOUT_TIME, AUTH_USER_SAGA, CHECK_AUTO_AUTH_STATE, DISPATCH_INGREDIENTS_SAGA} from '../actions/actionTypes'
import {logoutSaga, checkAuthSaga, authUserSaga, authAutoCheck} from './auth'
import { initIngredientSaga } from './burgerBuilder';
export function* watchAuth() {
    console.log('call AUTH_INITIAT--')
    yield takeEvery(AUTH_INITIAT, logoutSaga)
    yield takeEvery(AUTH_CHECKOUT_TIME, checkAuthSaga)
    yield takeEvery(AUTH_USER_SAGA, authUserSaga)
    yield takeEvery(CHECK_AUTO_AUTH_STATE, authAutoCheck)
    yield takeEvery(DISPATCH_INGREDIENTS_SAGA, initIngredientSaga)
}