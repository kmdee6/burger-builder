import React from "react";
import Wrap from "../../../hoc/Wrap";

const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(key => {
    return (
      <li key={key}>
        <span style={{ textTransform: "capitalize", marginRight: "20px" }}>
          {key}:
        </span>
        {props.ingredients[key]}
      </li>
    );
  });

  return (
    <Wrap>
      <h3>Order Summary</h3>
      <p>Your juicy order is ready!! Here's the Order Summary:</p>
      <ul>{ingredientSummary}</ul>
      <p>Continue to Checkout?</p>
    </Wrap>
  );
};

export default orderSummary;
