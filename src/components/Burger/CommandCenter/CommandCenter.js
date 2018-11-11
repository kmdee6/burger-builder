import React from "react";
import IngredientItem from "./IngredientItem/IngredientItem";
import classes from "./CommandCenter.css";

const items = [
  { type: "bacon", label: "Bacon" },
  { type: "cheese", label: "Cheese" },
  { type: "salad", label: "Salad" },
  { type: "meat", label: "Meat" }
];

const commandCenter = props => {
  return (
    <div className={classes.CommandCenter}>
      <p>
        Total Price: <strong>${props.totalPrice.toFixed(2)}</strong>
      </p>
      {items.map(item => {
        return (
          <IngredientItem
            key={item.label}
            label={item.label}
            type={item.type}
            disabled={props.disabledInfo[item.type]}
            less={() => props.removeIngredient(item.type)}
            more={() => props.addIngredient(item.type)}
          />
        );
      })}
      <button
        onClick={props.purchase}
        disabled={!props.purchasable}
        className={classes.OrderButton}
      >
        Place Order
      </button>
    </div>
  );
};

export default commandCenter;
