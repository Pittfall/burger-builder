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
            dispatch(authFail(error));
         });
   };
};

export const signIn = (email, password) => {
   return dispatch => {
      dispatch(authStart());
      SignInUser({email: email, password: password, returnSecureToken: true})
         .then(response => {
            dispatch(authSuccess(response.data));
         })
         .catch(error => {
            console.log(error);
            dispatch(authFail(error));
         });
   };
};

const authStart = () => {
   return {
      type: actionTypes.AUTH_START
   };
};

const authSuccess = (authData) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      authData: authData
   };
};

const authFail = (error) => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error
   };
};