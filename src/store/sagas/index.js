import {takeEvery} from 'redux-saga/effects';
import {AUTH_INITIAT, AUTH_CHECKOUT_TIME, AUTH_USER_SAGA, CHECK_AUTO_AUTH_STATE, DISPATCH_INGREDIENTS_SAGA, INIT_FETCH_ORDER_SAGA, PURCHASE_BURGER_SAGA} from '../actions/actionTypes'
import {logoutSaga, checkAuthSaga, authUserSaga, authAutoCheck} from './auth'
import { initIngredientSaga } from './burgerBuilder';
import { featchOrderSaga, purchaseBurgerSaga } from './order';
export function* watchAuth() {
    yield takeEvery(AUTH_INITIAT, logoutSaga)
    yield takeEvery(AUTH_CHECKOUT_TIME, checkAuthSaga)
    yield takeEvery(AUTH_USER_SAGA, authUserSaga)
    yield takeEvery(CHECK_AUTO_AUTH_STATE, authAutoCheck)
    yield takeEvery(DISPATCH_INGREDIENTS_SAGA, initIngredientSaga)
}
export function* watchBurgerBuilder() {
    yield takeEvery(DISPATCH_INGREDIENTS_SAGA, initIngredientSaga)
}
export function* watchOrders() {
    yield takeEvery(INIT_FETCH_ORDER_SAGA, featchOrderSaga)
    yield takeEvery(PURCHASE_BURGER_SAGA, purchaseBurgerSaga)
}