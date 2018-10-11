import { takeEvery, takeLatest, all } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, signUpSaga, signInSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';
import { initOrders, purchaseBurger } from './order';

export function* watchAuth() {
   yield all([
      takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
      takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
      takeEvery(actionTypes.AUTH_SIGN_UP, signUpSaga),
      takeEvery(actionTypes.AUTH_SIGN_IN, signInSaga),
      takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
   ]);
}

export function* watchBurgerBuilder() {
   yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrders() {
   yield all([
      // takeLatest will take the latest version of the saga rather than trying to run multiple versions of the same saga.
      takeLatest(actionTypes.INIT_ORDERS, initOrders),
      takeEvery(actionTypes.PURCHASE_BURGER, purchaseBurger)
   ]);
}