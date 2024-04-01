import { ActionTypes } from "./ActionTypes";

const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case ActionTypes.CANCEL_ORDER:
      return {
        ...state,
        orders: state.orders.filter((order) => order.id !== action.payload),
      };
    case ActionTypes.MOVE_TO_NEXT_STAGE:
      return {
        ...state,
        orders: state.orders.map((order) =>
          order.id === action.payload.orderId
            ? {
                ...order,
                stage: action.payload.nextStage,
                createdAt: action.payload.currentTime,
              }
            : order
        ),
      };
    default:
      return state;
  }
};

export default reducer;
