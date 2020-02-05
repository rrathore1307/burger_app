import * as actionType from './actionTypes';
import axios from '../../axios-orders'
export const purchaseBurgerSuccess=(orderId, orderData)=>{
    return {
        type: actionType.PURCHASE_BURGER_SUCCESS,
        id: orderId.name,
        orderData: orderData
    }
}



export const purchaseBurgerFaild=(error)=>{
    return {
        type: actionType.PURCHASE_BURGER_FAILED,
        error: error
    }
}



export const purchaseBurger=(orderData)=>{
    return dispatch=>{
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

export const purchaseBurgerStart =()=> {
    return {
        type: actionType.PURCHASE_BURGER_START
    }
}

export const purchaseInit =()=> {
    return {
        type: actionType.PURCHASE_INIT
    }
}