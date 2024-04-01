import { ActionTypes } from "./ActionTypes";
export const addOrder = (order) => ({
  type: ActionTypes.ADD_ORDER,
  payload: order,
});

export const cancelOrder = (orderId) => ({
  type: ActionTypes.CANCEL_ORDER,
  payload: orderId,
});

export const moveToNextStage = (orderId, nextStage) => {
  const currentTime = new Date();

  return {
    type: ActionTypes.MOVE_TO_NEXT_STAGE,
    payload: {
      orderId,
      nextStage,
      currentTime,
    },
  };
};
