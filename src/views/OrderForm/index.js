import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../../store/actions";
import ModalPopup from "../../components/organism/ModalPopup";
import SelectOption from "../../components/atoms/SelectOption";
import PrimeButton from "../../components/atoms/PrimeButton";

const OrderForm = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders);
  const [modalShow, setModalShow] = React.useState(false);
  const [order, setOrder] = useState({
    type: "",
    size: "",
    base: "",
  });
  const [error, setError] = useState(null);

  const nextOrderId =
    orders.length > 0 ? (parseInt(orders[orders.length - 1].id) + 1).toString().padStart(3, "0") : "001";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!order.type || !order.size || !order.base) {
      setError("Please select all order options.");
      return;
    }

    const newOrder = {
      id: nextOrderId,
      ...order,
      stage: "Order Placed",
      createdAt: new Date(),
    };
    dispatch(addOrder(newOrder));
    setOrder({
      type: "",
      size: "",
      base: "",
    });
    setError(null);
    setModalShow(false);
  };

  return (
    <div className="order-form">
      <PrimeButton className="primary-color" onClick={() => setModalShow(true)}>
        Place an Order
      </PrimeButton>
      <ModalPopup
        show={modalShow}
        title="Place an Order"
        submitForm={handleSubmit}
        submit="Submit"
        close="Close"
        onHide={() => setModalShow(false)}
      >
        <form>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="form-group">
            <label>Type</label>
            <SelectOption name="type" value={order.type} onChange={handleChange} className="selectOption">
              <option value="">Select Type</option>
              <option value="Veg">Veg</option>
              <option value="Non-Veg">Non-Veg</option>
            </SelectOption>
          </div>
          <div className="form-group">
            <label>Size</label>
            <SelectOption name="size" value={order.size} onChange={handleChange} className="selectOption">
              <option value="">Select Size</option>
              <option value="Large">Large</option>
              <option value="Medium">Medium</option>
              <option value="Small">Small</option>
            </SelectOption>
          </div>
          <div className="form-group">
            <label>Base</label>
            <SelectOption name="base" value={order.base} onChange={handleChange} className="selectOption">
              <option value="">Select Base</option>
              <option value="Thin">Thin</option>
              <option value="Thick">Thick</option>
            </SelectOption>
          </div>
        </form>
      </ModalPopup>
    </div>
  );
};

export default OrderForm;
