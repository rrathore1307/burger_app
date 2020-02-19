import * as actionType from './actionTypes';
import axios from '../../axios-orders'
export const purchaseBurgerSuccess = (orderId, orderData) => {
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        id: orderId.name,
        orderData: orderData
    }
}



export const purchaseBurgerFaild = (error) => {
    return {
        type: actionType.PURCHASE_BURGER_FAILED,
        error: error
    }
}



export const purchaseBurger = (orderData, token) => {
    console.log('purchaseBurger call')
    return {
        type: actionType.PURCHASE_BURGER_SAGA,
        orderData: orderData,
        token: token
    }
}

export const purchaseBurgerStart = () => {
    console.log('purchaseBurgerStart')
    return {
        type: actionType.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionType.PURCHASE_INIT
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionType.FETCH_ORDER_SUCCESS,
        orders: orders
    }
}

export const fetchOrderFailed = (error) => {
    return {
        type: actionType.FETCH_ORDER_FAILED,
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionType.FETCH_ORDER_START
    }
}

export const fetchOrders = (token) => {
    return {
        type: actionType.INIT_FETCH_ORDER_SAGA,
        token: token
    }
}