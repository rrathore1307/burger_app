import * as actionTypes from '../actions/actionTypes';
const inititalState = {
    orders: [],
    loading: false,
    purchased: false
}
const order = (state = inititalState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const neworder = {
                ...action.orderData,
                id: action.orderId
            }
            return {
                ...state,
                orders: state.orders.concat(neworder),
                loading: false,
                purchased: true
            };
        case actionTypes.PURCHASE_BURGER_FAILED:
            return {
                ...state,
                loading: false
            };
        case actionTypes.FETCH_ORDER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ORDER_FAILED:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.FETCH_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: action.orders
            }
        default:
            return state;
    }
}

export default order;