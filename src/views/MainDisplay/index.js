import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder, moveToNextStage } from "../../store/actions";
import { formatTime } from "../../utils/helpers";
import PrimeButton from "../../components/atoms/PrimeButton";

const MainDisplay = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleCancel = (orderId) => {
    dispatch(cancelOrder(orderId));
  };

  const handleNextStage = (orderId, currentStage) => {
    let nextStage;
    switch (currentStage) {
      case "Order Placed":
        nextStage = "Order in Making";
        break;
      case "Order in Making":
        nextStage = "Order Ready";
        break;
      case "Order Ready":
        nextStage = "Order Picked";
        break;
      default:
        return;
    }

    const updatedOrder = {
      ...orders.find((order) => order.id === orderId),
      createdAt: new Date(),
    };

    dispatch(moveToNextStage(updatedOrder.id, nextStage));
  };

  const getMakingTime = (size) => {
    switch (size) {
      case "Small":
        return 3 * 60;
      case "Medium":
        return 4 * 60;
      case "Large":
        return 5 * 60;
      default:
        return 0;
    }
  };

  const isOverdue = (createdAt, size) => {
    const elapsedTime = Math.floor((currentTime - new Date(createdAt)) / 1000);
    return elapsedTime > getMakingTime(size);
  };

  return (
    <div className="main-display">
      <div className="sections">
        <div className="section">
          <h3>Order Placed</h3>
          {orders
            .filter((order) => order.stage === "Order Placed")
            .map((order) => (
              <div key={order.id} className={`order-card ${isOverdue(order.createdAt, order.size) ? "overdue" : ""}`}>
                <div className="order-info">
                  <p>
                    <strong>Order:</strong>&nbsp;{order.id}
                  </p>
                  <p>
                    <strong>Size:</strong>&nbsp;{order.size}
                  </p>
                  <div className="d-flex gap-3 justify-content-center">
                    <p>
                      <strong>Base:</strong>&nbsp;{order.base}
                    </p>
                    <p>
                      <strong>Type:</strong>&nbsp;{order.type}
                    </p>
                  </div>
                  <p>{formatTime(Math.floor((currentTime - new Date(order.createdAt)) / 1000))}</p>
                </div>
                <div className="actions">
                  <PrimeButton className="primary-color" onClick={() => handleNextStage(order.id, order.stage)}>
                    Next
                  </PrimeButton>
                </div>
              </div>
            ))}
        </div>
        <div className="section">
          <h3>Order in Making</h3>
          {orders
            .filter((order) => order.stage === "Order in Making")
            .map((order) => (
              <div key={order.id} className={`order-card ${isOverdue(order.createdAt, order.size) ? "overdue" : ""}`}>
                <div className="order-info">
                  <p>
                    <strong>Order:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Size:</strong>&nbsp;{order.size}
                  </p>
                  <div className="d-flex gap-3 justify-content-center">
                    <p>
                      <strong>Base:</strong>&nbsp;{order.base}
                    </p>
                    <p>
                      <strong>Type:</strong>&nbsp;{order.type}
                    </p>
                  </div>
                  <p>{formatTime(Math.floor((currentTime - new Date(order.createdAt)) / 1000))}</p>
                </div>
                <div className="actions">
                  <PrimeButton className="primary-color" onClick={() => handleNextStage(order.id, order.stage)}>
                    Next
                  </PrimeButton>
                </div>
              </div>
            ))}
        </div>
        <div className="section">
          <h3>Order Ready</h3>
          {orders
            .filter((order) => order.stage === "Order Ready")
            .map((order) => (
              <div key={order.id} className={`order-card ${isOverdue(order.createdAt, order.size) ? "overdue" : ""}`}>
                <div className="order-info">
                  <p>
                    <strong>Order:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Size:</strong>&nbsp;{order.size}
                  </p>
                  <div className="d-flex gap-3 justify-content-center">
                    <p>
                      <strong>Base:</strong>&nbsp;{order.base}
                    </p>
                    <p>
                      <strong>Type:</strong>&nbsp;{order.type}
                    </p>
                  </div>
                  <p>{formatTime(Math.floor((currentTime - new Date(order.createdAt)) / 1000))}</p>
                </div>
                {order.stage !== "Order Picked" && (
                  <div className="actions">
                    <PrimeButton className="primary-color" onClick={() => handleNextStage(order.id, order.stage)}>
                      Next
                    </PrimeButton>
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="section">
          <h3>Order Picked</h3>
          {orders
            .filter((order) => order.stage === "Order Picked")
            .map((order) => (
              <div key={order.id} className={`order-card`}>
                <div className="order-info">
                  <p>
                    <strong>Order:</strong> {order.id}
                  </p>
                  <p>
                    <strong>Size:</strong>&nbsp;{order.size}
                  </p>
                  <div className="d-flex gap-3 justify-content-center">
                    <p>
                      <strong>Base:</strong>&nbsp;{order.base}
                    </p>
                    <p>
                      <strong>Type:</strong>&nbsp;{order.type}
                    </p>
                  </div>
                  <p>
                    <strong>{order.stage}</strong>
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MainDisplay;
