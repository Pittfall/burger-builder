import * as actionTypes from './actionTypes';
import { SaveOrder } from '../../Http/API/API';

export const purchaseInit = () => {
   return {
      type: actionTypes.PURCHASE_INIT
   }
}

const purchaseBurgerSuccess = (id, orderData) => {
   return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderId: id,
      orderData: orderData
   };
};

const purchaseBurgerFail = (error) => {
   return {
      type: actionTypes.PURCHASE_BURGER_FAIL,
      error: error
   };
};

const purchaseBurgerStart = () => {
   return {
      type: actionTypes.PURCHASE_BURGER_START
   }
}

export const purchaseBurger = (orderData) => {
   return dispatch => {
      dispatch(purchaseBurgerStart());
      SaveOrder(orderData)
        .then(response => {
           dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
           dispatch(purchaseBurgerFail(error));
        });
   }
}