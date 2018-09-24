import React from "react";
import classes from "./IngredientItem.css";

const ingredientItem = props => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>
      <div className={classes.Less}>Less</div>
      <div className={classes.More}>More</div>
      <div />
    </div>
  );
};

export default ingredientItem;
