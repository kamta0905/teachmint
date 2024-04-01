import React from "react";
import "./App.css";
import OrderForm from "./views/OrderForm";
import MainDisplay from "./views/MainDisplay";
import MainSectionTable from "./views/MainSectionTable";

function App() {
  return (
    <div className="App">
      <h1>Pizza Shop</h1>
      <div className="container">
        <div className="d-flex align-items-center mb-3 justify-content-between">
          <h2>Pizza Stages Section</h2>
          <OrderForm />
        </div>
        <MainDisplay />
        <MainSectionTable />
      </div>
    </div>
  );
}

export default App;
