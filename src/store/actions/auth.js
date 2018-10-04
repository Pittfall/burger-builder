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
            localStorage.setItem('token', response.data.idToken);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userId', response.data.localId)
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
   localStorage.removeItem('token');
   localStorage.removeItem('expirationDate');
   localStorage.removeItem('userId');

   return {
      type: actionTypes.AUTH_LOGOUT
   };
};

export const authCheckState = () => {
   return dispatch => {
      const token = localStorage.getItem('token');
      if (!token) {
         dispatch(logout());
      } else {
         const expirationDate = new Date(localStorage.getItem('expirationDate'));
         if (expirationDate < new Date()) {
           dispatch(logout());
         } else
         {
            dispatch(authSuccess({ idToken: token, localId: localStorage.getItem('userId') }));
            dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
         }
      }
   }
}

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