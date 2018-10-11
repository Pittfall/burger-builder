import * as actionTypes from './actionTypes';

export const initIngredients = () => {
   return {
        type: actionTypes.INIT_INGREDIENTS
   }
}

export const initIngredientsSuccess = (ingredients) => {
    return {
        type: actionTypes.INIT_INGREDIENTS_SUCCESS, 
        ingredients: ingredients 
    }
}

export const initIngredientsFail = () => {
    return {
        type: actionTypes.INIT_INGREDIENTS_FAILED
    }
}

export const addIngredient = ingredientName => {
   return {
      type: actionTypes.ADD_INGREDIENT,
      ingredient: ingredientName
   };
};

export const removeIngredient = ingredientName => {
   return {
      type: actionTypes.REMOVE_INGREDIENT,
      ingredient: ingredientName
   };
};

export const clearIngredients = () => {
    return {
        type: actionTypes.CLEAR_INGREDIENTS
    };
};