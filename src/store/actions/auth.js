import * as actionTypes from './actionTypes';
import { SignUpNewUser, SignInUser } from '../../Http/API/API';

export const signUp = (email, password) => {
   return dispatch => {
      dispatch(authStart());
      SignUpNewUser({email: email, password: password, returnSecureToken: true})
         .then(response => {
            dispatch(authSuccess(response.data));
         })
         .catch(error => {
            console.log(error);
            dispatch(authFail(error.data.error));
         });
   };
};

export const signIn = (email, password) => {
   return dispatch => {
      dispatch(authStart());
      SignInUser({email: email, password: password, returnSecureToken: true})
         .then(response => {
            console.log(response.data);
            dispatch(checkAuthTimeout(response.data.expiresIn));
            dispatch(authSuccess(response.data));
         })
         .catch(error => {
            console.log(error);
            dispatch(authFail(error.data.error));
         });
   };
};

export const logout = () => {
   return {
      type: actionTypes.AUTH_LOGOUT
   };
};

const checkAuthTimeout = (expirationTime) => {
   return dispatch => {
      setTimeout(() => {
         dispatch(logout());
      }, expirationTime * 1000);
   }
}

const authStart = () => {
   return {
      type: actionTypes.AUTH_START
   };
};

const authSuccess = (authData) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      token: authData.idToken,
      userId: authData.localId
   };
};

const authFail = (error) => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error
   };
};