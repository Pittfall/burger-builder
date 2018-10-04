import * as actionTypes from './actionTypes';
import { GetIngredients } from '../../Http/API/API';

export const initIngredients = () => {
   return dispatch => {
      GetIngredients()
          .then(response => {
              const ingredients = response.data;
              Object.keys(ingredients).forEach(key => { 
                  ingredients[key].quantity = 0;
              });

              dispatch({type: actionTypes.INIT_INGREDIENTS, ingredients: ingredients})
          })
          .catch(error =>{
             dispatch({type: actionTypes.INIT_INGREDIENTS_FAILED})
          });
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