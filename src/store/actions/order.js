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



export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('orders.json', orderData)
            .then(res => {
                dispatch(purchaseBurgerSuccess(res.data, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFaild(error))
            })
    }
}

export const purchaseBurgerStart = () => {
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

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get('/orders.json')
            .then(res => {
                console.log(res)
                const fetchOrders = []
                for (let key in res.data) {
                    fetchOrders.push({
                        ...res.data[key],
                        id: key
                    })
                }
                dispatch(fetchOrderSuccess(fetchOrders))
                console.log(this.state)
            })
            .catch(error => {
                console.log(error);
                dispatch(fetchOrderFailed(error))
            })
    }
}