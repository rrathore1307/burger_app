import * as actionTypes from '../actions/actionTypes';
const inititalState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseBurgerStart = (state)=> {
    return {
        ...state,
        loading: true
    }
}

const purchaseBurgerInit = (state)=> {
    return {
        ...state,
        loading: false
    }
}

const purchaseBurgerSuccess = (state, action)=> {
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
}

const purchaseBurgerFailed = (state)=> {
    return {
        ...state,
        loading: false
    }
}

const fetchOrderStart = (state)=> {
    return {
        ...state,
        loading: true
    }
}

const fetchOrderFailed = (state, action)=> {
    return {
        ...state,
        loading: false,
        error: action.error
    }
}

const fetchOrderSuccess = (state, action)=> {
    return {
        ...state,
        loading: false,
        orders: action.orders
    }
}

const order = (state = inititalState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_BURGER_START: return purchaseBurgerStart(state)
        case actionTypes.PURCHASE_INIT: return purchaseBurgerInit(state)
        case actionTypes.PURCHASE_BURGER_SUCCESS: return purchaseBurgerSuccess(state, action)
        case actionTypes.PURCHASE_BURGER_FAILED: return purchaseBurgerFailed(state);
        case actionTypes.FETCH_ORDER_START: return fetchOrderStart(state)
        case actionTypes.FETCH_ORDER_FAILED: return fetchOrderFailed(state, action)
        case actionTypes.FETCH_ORDER_SUCCESS: return fetchOrderSuccess(state, action)
        default:
            return state;
    }
}

export default order;