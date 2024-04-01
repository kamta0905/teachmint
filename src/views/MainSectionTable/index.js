import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cancelOrder } from "../../store/actions";
import { formatTime } from "../../utils/helpers";
import { Table } from "react-bootstrap";
import PrimeButton from "../../components/atoms/PrimeButton";
const MainSectionTable = () => {
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

  const deliveredOrders = orders.filter((order) => order.stage === "Order Picked");
  return (
    <div className="table-responsive mt-4">
      <h2 className="text-start mb-3">Main Section</h2>
      <Table className="table" bordered hover>
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Stage</th>
            <th>Total Time Spent (time from order placed)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.stage}</td>
              <td>{formatTime(Math.floor((new Date() - new Date(order.createdAt)) / 1000))}</td>
              <td>
                {order.stage !== "Order Picked" && (
                  <PrimeButton variant="outline-danger" onClick={() => handleCancel(order.id)}>
                    Cancel
                  </PrimeButton>
                )}
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan="4">
              <strong>Total order delivered: &nbsp;&nbsp;</strong>
              {deliveredOrders.map((order) => (
                <span key={order.id}>{order.id}, </span>
              ))}
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};
export default MainSectionTable;
