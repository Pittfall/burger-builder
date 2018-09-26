import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/actionTypes';
import { BASE_BURGER_PRICE } from '../../Constants/Constants'

const initialState = {
  // Temporarily keep it local until learning how to load it asynchronous from our database.
  ingredients: {
    bacon : {
      name : 'Bacon',
      price : 1,
      quantity: 0
    },
    cheese : {
      name : 'Cheese',
      price : 0.8,
      quantity: 0
    },
    meat : {
      name : 'Meat',
      price : 1.3,
      quantity: 0
    },
    salad : {
      name : 'Salad',
      price : 0.5,
      quantity: 0
    }
  },
  totalPrice: BASE_BURGER_PRICE
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT: {
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
    case REMOVE_INGREDIENT: {
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
    default:
      return state;
  }
}

export default reducer;