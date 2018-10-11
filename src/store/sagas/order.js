import { put } from 'redux-saga/effects'

import { GetOrders, SaveOrder } from '../../Http/API/API';
import { initOrdersStart, initOrdersSuccess, initOrdersFailed } from '../actions/order';
import { purchaseBurgerStart, purchaseBurgerSuccess, purchaseBurgerFail } from '../actions/order';

export function* initOrders(action) {
   yield put(initOrdersStart());

   try {
      const response = yield GetOrders(action.token, action.userId);
      const orders = yield [];

      for (let key in response.data) {
         yield orders.push( {
            ...response.data[key],
            id: key
         });
      }

      yield put(initOrdersSuccess(orders));
   } catch (error) {
      yield put(initOrdersFailed(error.data.error));
   }
}

export function* purchaseBurger(action) {
   yield put(purchaseBurgerStart());

   try {
      const response = yield SaveOrder(action.token, action.orderData);

      yield put(purchaseBurgerSuccess(response.data.name, action.orderData));
   } catch (error) {
      yield put(purchaseBurgerFail(error.data.error));
   }
}