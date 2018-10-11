import { put } from 'redux-saga/effects'

import { GetIngredients } from '../../Http/API/API';

import { initIngredientsSuccess, initIngredientsFail } from '../actions/burgerBuilder';

export function* initIngredientsSaga() {
   try {
      const response = yield GetIngredients();
      const ingredients = yield response.data;

      yield Object.keys(ingredients).forEach(key => { 
         ingredients[key].quantity = 0;
      });

      yield put(initIngredientsSuccess(ingredients));
   } catch (error) {
      yield put(initIngredientsFail());
   }
}