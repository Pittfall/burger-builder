import { takeEvery } from 'redux-saga/effects'

import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkAuthTimeoutSaga, signUpSaga, signInSaga, authCheckStateSaga } from './auth';
import { initIngredientsSaga } from './burgerBuilder';

export function* watchAuth() {
   yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
   yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
   yield takeEvery(actionTypes.AUTH_SIGN_UP, signUpSaga);
   yield takeEvery(actionTypes.AUTH_SIGN_IN, signInSaga);
   yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
   yield takeEvery(actionTypes.INIT_INGREDIENTS, initIngredientsSaga);
}