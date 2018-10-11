import * as actionTypes from './actionTypes';

export const signUp = (email, password) => {
   return {
    type: actionTypes.AUTH_SIGN_UP,
    email: email,
    password: password
   };
};

export const signIn = (email, password) => {
  return {
    type: actionTypes.AUTH_SIGN_IN,
    email: email,
    password: password
  };
};

export const logout = () => {
   return {
      type: actionTypes.AUTH_INITIATE_LOGOUT
   };
};

export const logoutSuccess = () => {
  return {
     type: actionTypes.AUTH_LOGOUT
  };
};

export const authCheckState = () => {
   return {
     type: actionTypes.AUTH_CHECK_STATE
   }
}

export const checkAuthTimeout = (expirationTime) => {
   return {
     type: actionTypes.AUTH_CHECK_TIMEOUT,
     expirationTime: expirationTime
   };
}

export const authStart = () => {
   return {
      type: actionTypes.AUTH_START
   };
};

export const authSuccess = (authData) => {
   return {
      type: actionTypes.AUTH_SUCCESS,
      token: authData.idToken,
      userId: authData.localId
   };
};

export const authFail = (error) => {
   return {
      type: actionTypes.AUTH_FAIL,
      error: error
   };
};