import * as actionTypes from '../actions/actionTypes';
const inititalState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}
const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.6,
    meat: 1.2,
    cheese: 0.8
}
const burgerBuilder = (state = inititalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
            };
        case actionTypes.DISPATCH_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...action.ingredients,
                },
            };
        case actionTypes.FEATCH_FAILED_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                },
                error: action.error
            };
        default:
            return state;
    }
}

export default burgerBuilder;