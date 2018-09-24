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
    <div className={classes.BuildControls}>
      {items.map(item => {
        return (
          <IngredientItem
            key={item.label}
            label={item.label}
            type={item.type}
          />
        );
      })}
    </div>
  );
};

export default commandCenter;
