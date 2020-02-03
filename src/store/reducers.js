import * as actionTypes from './actions';
const inititalState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
}
const INGREDIENT_PRICE = {
    salad: 0.5,
    bacon: 0.6,
    meat: 1.2,
    cheese: 0.8
}
const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICE[action.payload.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload.ingredientName]: state.ingredients[action.payload.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICE[action.payload.ingredientName]
            };
        default:
            return state;
    }
}

export default reducer;