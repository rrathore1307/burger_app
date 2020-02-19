import { put } from 'redux-saga/effects';
import * as actions from '../actions/index'

import axios from '../../axios-orders'

export function* initIngredientSaga() {
    try {
        const response = yield axios.get('https://my-burger-app-455ac.firebaseio.com/ingredient.json')
        yield put(actions.dispatchIngredient(response.data))
    } catch (error) {
        yield put(actions.fetchFailedIngredient())
        console.log(error)
    }
}