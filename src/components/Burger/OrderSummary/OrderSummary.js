import React from "react";
import Wrap from "../../../hoc/Wrap";
import Button from "../../UI/Button/Button";

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
      <p>
        <strong>Total Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button buttonType="Danger" clicked={props.cancelBtn}>
        CANCEL
      </Button>
      <Button buttonType="Success" clicked={props.continueBtn}>
        CONTINUE
      </Button>
    </Wrap>
  );
};

export default orderSummary;
