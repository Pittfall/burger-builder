import * as actionTypes from './actionTypes';

export const initOrders = (token, userId) => {
   return {
       type: actionTypes.INIT_ORDERS,
       token: token,
       userId: userId
   }
}

export const initOrdersStart = () => {
    return {
        type: actionTypes.INIT_ORDERS_START
    }
}

export const initOrdersSuccess = (orders) => {
    return {
        type: actionTypes.INIT_ORDERS_SUCCESS,
        orders: orders
    }
}

export const initOrdersFailed = (error) => {
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

export const purchaseBurgerSuccess = (id, orderData) => {
   return {
      type: actionTypes.PURCHASE_BURGER_SUCCESS,
      orderId: id,
      orderData: orderData
   };
};

export const purchaseBurgerFail = (error) => {
   return {
      type: actionTypes.PURCHASE_BURGER_FAIL,
      error: error
   };
};

export const purchaseBurgerStart = () => {
   return {
      type: actionTypes.PURCHASE_BURGER_START
   }
}

export const purchaseBurger = (token, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER,
        token: token,
        orderData: orderData
    }
}