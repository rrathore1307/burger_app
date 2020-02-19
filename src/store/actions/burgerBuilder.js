import * as actionType from './actionTypes';
import axios from '../../axios-orders'
export const addIngredient=(ingName)=>{
    return {
        type: actionType.ADD_INGREDIENTS,
        ingredientName: ingName
    }
}

export const removeIngredient=(ingName)=>{
    return {
        type: actionType.REMOVE_INGREDIENTS,
        ingredientName: ingName
    }
}

export const dispatchIngredient=(ings)=>{
    return {
        type: actionType.DISPATCH_INGREDIENTS,
        ingredients: ings
    }
}

export const fetchFailedIngredient=()=>{
    return {
        type: actionType.FEATCH_FAILED_INGREDIENTS
    }
}

export const initIngredient=()=>{
    return {
        type: actionType.DISPATCH_INGREDIENTS_SAGA
    }
}