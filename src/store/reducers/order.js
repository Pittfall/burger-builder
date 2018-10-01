import * as actionTypes from '../actions/actionTypes';

const initialState = {
   orders: [],
   purchasing: false,
   purchased: false
}

const reducer = (state = initialState, action) => {
   switch (action.type) {
      case actionTypes.PURCHASE_INIT:
         return {
            ...state,
            purchased: false
         }
      case actionTypes.PURCHASE_BURGER_START:
         return {
            ...state,
            purchasing: true
         }
      case actionTypes.PURCHASE_BURGER_SUCCESS:
         const newOrder = {
            ...action.orderData,
            id: action.orderId
         }

         return {
            ...state,
            purchasing: false,
            purchased: true,
            orders: {...state.orders, newOrder}
         };
      case actionTypes.PURCHASE_BURGER_FAIL:
         return {
            ...state,
            purchasing: false
         };
      default:
         return state;
   }
}

export default reducer;