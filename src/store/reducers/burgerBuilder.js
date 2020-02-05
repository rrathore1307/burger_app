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

const addIngredient =(state, action)=> {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] + 1
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICE[action.ingredientName]
    };
}

const removeIngredient= (state, action)=> {
    return {
        ...state,
        ingredients: {
            ...state.ingredients,
            [action.ingredientName]: state.ingredients[action.ingredientName] - 1
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICE[action.ingredientName]
    };
}

const fetchFailedIngredients = (state, action)=> {
    return {
        ...state,
        error: true
    };
}

const dispatchIngredients =(state, action)=> {
    return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: 4
    };
}

const burgerBuilder = (state = inititalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS: return addIngredient(state, action)
        case actionTypes.REMOVE_INGREDIENTS: return removeIngredient(state, action)
        case actionTypes.DISPATCH_INGREDIENTS: return dispatchIngredients(state, action)
        case actionTypes.FEATCH_FAILED_INGREDIENTS: return fetchFailedIngredients(state, action)
        default:
            return state;
    }
}

export default burgerBuilder;