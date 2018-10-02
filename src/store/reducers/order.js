import * as actionTypes from '../actions/actionTypes';

const initialState = {
   orders: [],
   loading: false,
   purchased: false,
   error: null
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.INIT_ORDERS_START:
         return {
            loading: true,
            error: null
         }
      case actionTypes.INIT_ORDERS_SUCCESS:
         return {
            ...state,
            orders: action.orders,
            loading: false,
            error: null
         }
      case actionTypes.INIT_ORDERS_FAILED:
         return {
            ...state,
            loading: false,
            error: action.error
         }
      case actionTypes.PURCHASE_INIT:
         return {
            ...state,
            purchased: false,
            error: null
         }
      case actionTypes.PURCHASE_BURGER_START:
         return {
            ...state,
            loading: true,
            error: null
         }
      case actionTypes.PURCHASE_BURGER_SUCCESS:
         const newOrder = {
            ...action.orderData,
            id: action.orderId
         }

         return {
            ...state,
            loading: false,
            purchased: true,
            error: null,
            orders: {...state.orders, newOrder}
         };
      case actionTypes.PURCHASE_BURGER_FAIL:
         return {
            ...state,
            loading: false,
            error: action.error
         };
      default:
         return state;
   }
}

export default reducer;