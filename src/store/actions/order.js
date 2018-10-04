import * as actionTypes from './actionTypes';
import { SaveOrder, GetOrders } from '../../Http/API/API';

export const initOrders = (token, userId) => {
   return dispatch => {
        dispatch(initOrdersStart());
        GetOrders(token, userId)
            .then (response => {
                const orders = [];
                for (let key in response.data) {
                    orders.push( {
                        ...response.data[key],
                        id: key
                    });
                }
                dispatch(initOrdersSuccess(orders));
            })
            .catch (error => {
                dispatch(initOrdersFailed(error.data.error));
            });
   }
}

const initOrdersStart = () => {
    return {
        type: actionTypes.INIT_ORDERS_START
    }
}

const initOrdersSuccess = (orders) => {
    return {
        type: actionTypes.INIT_ORDERS_SUCCESS,
        orders: orders
    }
}

const initOrdersFailed = (error) => {
    return {
        type: actionTypes.INIT_ORDERS_FAILED,
        error: error
    }
}

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

export const purchaseBurger = (token, orderData) => {
   return dispatch => {
      dispatch(purchaseBurgerStart());
      SaveOrder(token, orderData)
        .then(response => {
           dispatch(purchaseBurgerSuccess(response.data.name, orderData));
        })
        .catch(error => {
           dispatch(purchaseBurgerFail(error.data.error));
        });
   }
}