import { delay } from 'redux-saga';
import { put } from 'redux-saga/effects'

import { logout, logoutSuccess, authStart, authSuccess, authFail, checkAuthTimeout } from '../actions/auth';
import { SignUpNewUser, SignInUser } from '../../Http/API/API';

export function* logoutSaga() {
   yield localStorage.removeItem('token');
   yield localStorage.removeItem('expirationDate');
   yield localStorage.removeItem('userId');

   yield put(logoutSuccess());
}

export function* checkAuthTimeoutSaga(action) {
   yield delay(action.expirationTime * 1000);
   yield put(logout());
}

export function* signUpSaga(action) {
   yield put(authStart());

   try {
      const response = yield SignUpNewUser({email: action.email, password: action.password, returnSecureToken: true});
      yield put(authSuccess(response.data));
   } catch (error) {
      yield put(authFail(error.data.error));
   }
}

export function* signInSaga(action) {
   yield put(authStart());
   
   try {
      const response = yield SignInUser({email: action.email, password: action.password, returnSecureToken: true});
      const expirationDate = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);

      yield localStorage.setItem('token', response.data.idToken);
      yield localStorage.setItem('expirationDate', expirationDate);
      yield localStorage.setItem('userId', response.data.localId);

      yield put(checkAuthTimeout(response.data.expiresIn));
      yield put(authSuccess(response.data));
   } catch (error) {
      yield put(authFail(error.data.error));
   }
}

export function* authCheckStateSaga(action) {
   const token = yield localStorage.getItem('token');

   if (!token) {
      yield put(logout());
   } else {
      const expirationDate = yield new Date(localStorage.getItem('expirationDate'));
      if (expirationDate < new Date()) {
         yield put(logout());
      } else
      {
         yield put(authSuccess({ idToken: token, localId: localStorage.getItem('userId') }));
         yield put(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      }
   }
}