import React from "react";
import Wrap from "../../../hoc/Wrap";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize" }}>{key}</span>:
        {props.ingredients[key]}
      </li>
    );
  });

  return (
    <Wrap>
      <h3>Order Summary</h3>
      <p>Your juicy order is ready!! Summary:</p>
      <ul>{ingredientSummary}</ul>
    </Wrap>
  );
};

export default orderSummary;
