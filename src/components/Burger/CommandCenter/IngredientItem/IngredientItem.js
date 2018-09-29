import React from "react";
import classes from "./IngredientItem.css";

const ingredientItem = props => {
  return (
    <div className={classes.CommandCenter}>
      <div className={classes.Label}>{props.label}</div>
      <button
        disabled={props.disabled}
        className={classes.Less}
        onClick={props.less}
      >
        Less
      </button>
      <button className={classes.More} onClick={props.more}>
        More
      </button>
      <div />
    </div>
  );
};

export default ingredientItem;
