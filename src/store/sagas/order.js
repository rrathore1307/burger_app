import { put } from 'redux-saga/effects';
import * as actions from '../actions/index'
import axios from '../../axios-orders'

export function* featchOrderSaga(action) {
    yield put(actions.fetchOrderStart())
    try {
        const response = yield axios.get('/orders.json?auth=' + action.token)
        // const response = yield axios.get('/orders.json')
        const fetchOrders = []
        for (let key in response.data) {
            fetchOrders.push({
                ...response.data[key],
                id: key
            })
        }
        yield put(actions.fetchOrderSuccess(fetchOrders))
    } catch (error) {
        console.log(error);
        yield put(actions.fetchOrderFailed(error))
    }
}

export function* purchaseBurgerSaga(action) {
    yield put(actions.purchaseBurgerStart())
    try {
        const response = yield axios.post('/orders.json?auth=' + action.token, action.orderData)
        yield put(actions.purchaseBurgerSuccess(response.data, action.orderData))
    } catch (error) {
        yield put(actions.purchaseBurgerFaild(error))
    }
}