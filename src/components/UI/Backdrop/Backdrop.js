import React from "react";
import classes from "./Backdrop.css";

const backdrop = props => {
  return props.show ? (
    <div onClick={props.close} className={classes.Backdrop} />
  ) : null;
};

export default backdrop;
