import * as actionTypes from '../actions/actionTypes';
import { BASE_BURGER_PRICE } from '../../Constants/Constants'

const initialState = {
  // Temporarily keep it local until learning how to load it asynchronous from our database.
  ingredients: null,
  totalPrice: BASE_BURGER_PRICE,
  error: false
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_INGREDIENTS:
      return {
        ...state,
        ingredients: action.ingredients,
        error: false,
        totalPrice: BASE_BURGER_PRICE
      }
    case actionTypes.INIT_INGREDIENTS_FAILED:
      return {
        ...state,
        error: true
      }
    case actionTypes.ADD_INGREDIENT: {
      const updatedIngredients = {
        ...state.ingredients,
        [action.ingredient]: {
          ...state.ingredients[action.ingredient],
          quantity: state.ingredients[action.ingredient].quantity + 1
        }
      };

      return {
        ...state, ingredients: updatedIngredients,
        totalPrice: state.totalPrice + state.ingredients[action.ingredient].price
      }
    }
    case actionTypes.REMOVE_INGREDIENT: {
      const updatedIngredients = {
        ...state.ingredients,
        [action.ingredient]: {
          ...state.ingredients[action.ingredient],
          quantity: state.ingredients[action.ingredient].quantity - 1
        }
      };

      return {
        ...state, ingredients: updatedIngredients,
        totalPrice: state.totalPrice - state.ingredients[action.ingredient].price
      }
    }
    case actionTypes.CLEAR_INGREDIENTS: {
      return {
        ...state,
        ingredients: null
      }
    }
    default:
      return state;
  }
}

export default reducer;