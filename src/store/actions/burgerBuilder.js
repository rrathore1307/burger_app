import * as actionType from './actionTypes';

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